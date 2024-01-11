import { useDispatch, useSelector } from '@redux'
import { AuthState } from '@types'
import { authApiSlice } from 'src/redux/api'
import { authActions } from 'src/redux/auth'


const {
    useLazyCreateAccountWithIdentifierAndPasswordQuery,
    useLazyLoginWithIdentifierAndPasswordQuery,
    useLazyGetAuthUserQuery
} = authApiSlice

interface IUseAuth {
    login: (identifier: string, password: string) => Promise<void>
    getAuthUser: () => Promise<void>
    logout: () => Promise<void>
    createAccount: (username: string, email: string, password: string) => Promise<void>
    auth: AuthState
}

const useAuth = () : IUseAuth => {

    const [ flux_createAccountWithIdentifierAndPassword ] = useLazyCreateAccountWithIdentifierAndPasswordQuery()
    const [ flux_loginWithIdentifierAndPassword ] = useLazyLoginWithIdentifierAndPasswordQuery()
    const [ flux_getAuthUser ] = useLazyGetAuthUserQuery()

    const auth : AuthState = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const jwtExists = () : boolean => {
        return (auth.token && auth.token.length > 0) ? true : false
    }

    const login = async (identifier: string, password: string) => {
        try {
            const { data, error } = await flux_loginWithIdentifierAndPassword({ identifier, password })

            if (error && 'data' in error && error.status === 400) {
                dispatch(authActions.invalidCredentialsError())
            }
            if (data) {
                dispatch(authActions.login(data))
            }
        } catch (err) {
            console.log(err)
            logout()
        }
    }

    const getAuthUser = async () => {
        if (jwtExists()) {
            const { data, error } = await flux_getAuthUser()

            if (error) logout()

            if (data) {
                dispatch(authActions.login({
                    jwt: auth.token as string,
                    user: data
                }))
            }
        } else {
            logout()
        }
    }

    const createAccount = async (username: string, email: string, password: string) => {
        try {
            const { data, error } = await flux_createAccountWithIdentifierAndPassword({ username, email, password })

            if (error) logout()
            if (data) {
                dispatch(authActions.login(data))
            }
        } catch (err) {
            console.log(err)
            logout()
        }
    }

    const logout = async () => {
        dispatch(authActions.logout())
    }
    
    return {
        login,
        getAuthUser,
        logout,
        createAccount,
        auth
    }
}

export default useAuth