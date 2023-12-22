import AsyncStorage from '@react-native-async-storage/async-storage'
import createFilter from 'redux-persist-transform-filter'
import { persistReducer } from 'redux-persist'
import { themeReducer } from './themeSlice'


const saveSubsetFilter = createFilter(
    'theme',
    ['theme']
)

const persistConfig = {
    key: 'theme',
    storage: AsyncStorage,
    whitelist: ['theme'],
    transforms: [saveSubsetFilter]
}

const persistedSearchReducer = persistReducer(persistConfig, themeReducer)

export default persistedSearchReducer