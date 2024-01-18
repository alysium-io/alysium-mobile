import { global } from '@etc'
import { useDispatch, useSelector } from '@redux'
import { AccountList, AccountListItem, Persona, UserState } from '@types'
import { userApiSlice } from 'src/redux/api'
import { userActions } from 'src/redux/user'

const {
    useLazyGetUserDetailsQuery,
    useLazyCreateHostQuery,
    useLazyCreateArtistQuery
} = userApiSlice

interface IUseUser {
    getUserDetails: () => Promise<void>
    createHost: (name: string) => Promise<void>
    createArtist: (name: string) => Promise<void>
    getAccountList: () => AccountList | null
    resetUser: () => void
    user: UserState
}

const useUser = () : IUseUser => {

    const user : UserState = useSelector(state => state.user)
    const activePersonaId = useSelector(state => state.persona.activePersonaId)
    const activePersonaType = useSelector(state => state.persona.activePersonaType)
    const dispatch = useDispatch()
    
    const [ flux_getUserDetails ] = useLazyGetUserDetailsQuery()
    const [ flux_createHost ] = useLazyCreateHostQuery()
    const [ flux_createArtist ] = useLazyCreateArtistQuery()

    const getUserDetails = async () => {
        try {
            const { data, error } = await flux_getUserDetails()

            if (error) {
                console.log(error)
            }
            if (data) {
                dispatch(userActions.setUser(data))
            }
        } catch (err) {
            throw err
        }
    }

    const resetUser = () => {
        dispatch(userActions.resetUser())
    }

    const getAccountList = () : AccountList | null => {
        if (user.user === null) {
            return null
        }

        // First get the user account
        const userAccount : AccountListItem = {
            id: user.user.id,
            name: user.user.username,
            type: Persona.user,
            image: global.artistImages['seth hills'],
            isActive: (
                activePersonaId === user.user.id &&
                activePersonaType === Persona.user
            )
        }

        // Now get the host accounts
        const hostAccounts : AccountList = user.user.hosts.map(host => ({
            id: host.id,
            name: host.name || 'Host',
            type: Persona.host,
            image: global.artistImages['seth hills'],
            isActive: (
                activePersonaId === host.id &&
                activePersonaType === Persona.host
            )
        }))

        // Now get the artist accounts
        const artistAccounts : AccountList = user.user.artists.map(artist => ({
            id: artist.id,
            name: artist.name || 'Artist',
            type: Persona.artist,
            image: global.artistImages['seth hills'],
            isActive: (
                activePersonaId === artist.id &&
                activePersonaType === Persona.artist
            )
        }))

        return [userAccount, ...hostAccounts, ...artistAccounts]
    }
    
    const createHost = async (name: string) => {
        try {
            const { data, error } = await flux_createHost({ name })

            if (error) {
                console.log(error)
            }
            if (data) {
                getUserDetails()
            }
        } catch (err) {
            throw err
        }
    }

    const createArtist = async (name: string) => {
        try {
            const { data, error } = await flux_createArtist({ name })

            if (error) {
                console.log(error)
            }
            if (data) {
                getUserDetails()
            }
        } catch (err) {
            throw err
        }
    }

    return {
        getUserDetails,
        createHost,
        createArtist,
        getAccountList,
        resetUser,
        user
    }
}

export default useUser