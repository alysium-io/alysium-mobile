import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import { hostReducer } from './hostSlice'


const persistConfig = {
    key: 'host',
    storage: AsyncStorage,
    whitelist: []
}

const persistedSearchReducer = persistReducer(persistConfig, hostReducer)

export default persistedSearchReducer