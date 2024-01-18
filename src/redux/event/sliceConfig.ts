import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import { eventReducer } from './eventSlice'


const persistConfig = {
    key: 'event',
    storage: AsyncStorage,
    whitelist: []
}

const persistedSearchReducer = persistReducer(persistConfig, eventReducer)

export default persistedSearchReducer