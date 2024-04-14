import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import { searchReducer } from './searchSlice'


const persistConfig = {
    key: 'search',
    storage: AsyncStorage,
    whitelist: ['recentSearches']
}

const persistedSearchReducer = persistReducer(persistConfig, searchReducer)

export default persistedSearchReducer
