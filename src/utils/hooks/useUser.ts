import { useDispatch, useSelector } from 'src/redux'
import { UserState } from 'src/types'
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
    action_invalidCredentialsError
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
        flux_loginUser({ identifier, password })
            .then(({ data, error }) => {
                if (error && 'data' in error && error.status === 400) {
                    dispatch(action_invalidCredentialsError())
                }
                if (data) {
                    const { user, jwt } = data
                    dispatch(action_setUser({ user, jwt }))
                }
            })
            .catch(() => logout())
    }

    const getUser = async () => {
        if (jwtExists()) {
            flux_getMe()
                .then(({ data, error }) => {
                    if (error) logout()
                    if (data) {
                        dispatch(action_setUser({
                            user: data,
                            jwt: user.token as string
                        }))
                    }
                })
                .catch(() => logout())
        } else {
            logout()
        }
    }

    const createAccount = async (username: string, email: string, password: string) => {
        flux_createAccount({ username, email, password })
            .then(({ data, error }) => {
                if (error) logout()
                if (data) {
                    dispatch(action_setUser({
                        user: data.user,
                        jwt: user.token as string
                    }))
                }
            })
            .catch(() => logout())
    }

    const logout = async () => {
        dispatch(action_logout())
    }

    const createHost = async (name: string) => {
        flux_createHost({ name })
            .then(({ data, error }) => {
                if (error) {
                    console.log(error)
                }
                if (data) {
                    console.log(data)
                    getUser()
                }
            })
            .catch(err => console.log(err))
    }

    const createArtist = async (name: string) => {
        flux_createArtist({ name })
            .then(({ data, error }) => {
                if (error) {
                    console.log(error)
                }
                if (data) {
                    console.log(data)
                    getUser()
                }
            })
            .catch(err => console.log(err))
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