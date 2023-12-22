import { useDispatch, useSelector } from 'src/redux'
import { UserState } from 'src/types'
import {
    useLazyAuthUserQuery,
    useLazyGetMeQuery
} from 'src/redux/api/base/baseApiSlice'
import {
    action_setUser,
    action_logout,
    action_invalidCredentialsError
} from 'src/redux/user'


interface IUseUser {
    logIn: (identifier: string, password: string) => Promise<void>;
    getUser: () => Promise<void>;
    logout: () => Promise<void>;
    user: UserState;
}

const useUser = () : IUseUser => {

    const [ authUser ] = useLazyAuthUserQuery()
    const [ getMe ] = useLazyGetMeQuery()

    const user : UserState = useSelector(state => state.user)
    const dispatch = useDispatch()

    const checkTokenExists = async () => { if (!user.token) { dispatch(action_logout()) } }

    const logIn = async (identifier: string, password: string) => {
        authUser({ identifier, password })
            .then(({ data, error }) => {
                if (error && 'data' in error && error.status === 400) {
                    dispatch(action_invalidCredentialsError())
                }
                if (data) {
                    const { user, jwt } = data
                    dispatch(action_setUser({ user, jwt }))
                }
            })
    }

    const getUser = async () => {
        checkTokenExists()
        getMe()
            .then(({ data, error }) => {
                if (error) {
                    dispatch(action_logout())
                }
                if (data) {
                    dispatch(action_setUser({
                        user: data,
                        jwt: user.token as string
                    }))
                }
            })
    }

    const logout = async () => {
        dispatch(action_logout())
    }

    return {
        logIn,
        getUser,
        logout,
        user
    }
}

export default useUser