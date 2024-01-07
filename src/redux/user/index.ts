export { default as userReducer } from './sliceConfig'

export {
    setToken as action_setToken,
    setUser as action_setUser,
    logout as action_logout,
    invalidCredentialsError as action_invalidCredentialsError,
    setStage as action_setStage
} from './userSlice'