import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import { artistReducer } from './artistSlice'


const persistConfig = {
    key: 'artist',
    storage: AsyncStorage,
    whitelist: []
}

const persistedSearchReducer = persistReducer(persistConfig, artistReducer)

export default persistedSearchReducer