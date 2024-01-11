import { useDispatch, useSelector } from '@redux'
import { UserState } from '@types'
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
    user: UserState
}

const useUser = () : IUseUser => {

    const user : UserState = useSelector(state => state.user)
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
        user
    }
}

export default useUser