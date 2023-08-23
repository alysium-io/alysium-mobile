export { default as userReducer } from './sliceConfig'

export {
    setUser as action_setUser,
    logout as action_logout,
    invalidCredentialsError as action_invalidCredentialsError
} from './userSlice'