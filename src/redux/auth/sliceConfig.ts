import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import { authReducer } from './authSlice'


const persistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    whitelist: ['token']
}

const persistedSearchReducer = persistReducer(persistConfig, authReducer)

export default persistedSearchReducer