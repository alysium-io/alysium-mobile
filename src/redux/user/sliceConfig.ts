import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import { userReducer } from './userSlice'


const persistConfig = {
    key: 'user',
    storage: AsyncStorage,
    whitelist: ['token']
}

const persistedSearchReducer = persistReducer(persistConfig, userReducer)

export default persistedSearchReducer