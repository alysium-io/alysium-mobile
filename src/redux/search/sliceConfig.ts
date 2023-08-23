import AsyncStorage from '@react-native-async-storage/async-storage'
import createFilter from 'redux-persist-transform-filter'
import { persistReducer } from 'redux-persist'
import { searchReducer } from './searchSlice'


const saveSubsetFilter = createFilter(
    'search',
    ['recentSearches']
)

const persistConfig = {
    key: 'search',
    storage: AsyncStorage,
    whitelist: ['recentSearches'],
    transforms: [saveSubsetFilter]
}

const persistedSearchReducer = persistReducer(persistConfig, searchReducer)

export default persistedSearchReducer
