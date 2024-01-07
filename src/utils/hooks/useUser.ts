import { useDispatch, useSelector } from '@redux'
import { UserState, Stage } from '@types'
import {
    useLazyLoginUserQuery,
    useLazyGetMeQuery,
    useLazyCreateAccountQuery,
    useLazyCreateHostQuery,
    useLazyCreateArtistQuery
} from 'src/redux/api/base/baseApiSlice'
import {
    action_setUser,
    action_logout,
    action_invalidCredentialsError,
    action_setStage,
    action_setToken
} from 'src/redux/user'


interface IUseUser {
    logIn: (identifier: string, password: string) => Promise<void>
    getUser: () => Promise<void>
    logout: () => Promise<void>
    createAccount: (username: string, email: string, password: string) => Promise<void>
    createHost: (name: string) => Promise<void>
    createArtist: (name: string) => Promise<void>
    user: UserState
}

const useUser = () : IUseUser => {

    const [ flux_loginUser ] = useLazyLoginUserQuery()
    const [ flux_getMe ] = useLazyGetMeQuery()
    const [ flux_createAccount ] = useLazyCreateAccountQuery()
    const [ flux_createHost ] = useLazyCreateHostQuery()
    const [ flux_createArtist ] = useLazyCreateArtistQuery()

    const user : UserState = useSelector(state => state.user)
    const dispatch = useDispatch()

    const jwtExists = () : boolean => {
        return (user.token && user.token.length > 0) ? true : false
    }

    const logIn = async (identifier: string, password: string) => {
        try {
            const { data, error } = await flux_loginUser({ identifier, password })

            if (error && 'data' in error && error.status === 400) {
                dispatch(action_invalidCredentialsError())
            }
            if (data) {
                dispatch(action_setToken(data.jwt))
            }
        } catch (err) {
            console.log(err)
            logout()
        }
    }

    const getUser = async () => {
        if (jwtExists()) {
            const { data, error } = await flux_getMe()

            if (error) logout()

            if (data) {
                dispatch(action_setUser(data))
                dispatch(action_setStage(Stage.loggedIn))
            }
        } else {
            logout()
        }
    }

    const createAccount = async (username: string, email: string, password: string) => {
        try {
            const { data, error } = await flux_createAccount({ username, email, password })

            if (error) logout()
            if (data) {
                dispatch(action_setToken(data.jwt))
            }
        } catch (err) {
            console.log(err)
            logout()
        }
    }

    const logout = async () => {
        dispatch(action_logout())
    }

    const createHost = async (name: string) => {
        try {
            const { data, error } = await flux_createHost({ name })

            if (error) {
                console.log(error)
            }
            if (data) {
                getUser()
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
                getUser()
            }
        } catch (err) {
            throw err
        }
    }

    return {
        logIn,
        getUser,
        logout,
        createAccount,
        createHost,
        createArtist,
        user
    }
}

export default useUser