import AsyncStorage from '@react-native-async-storage/async-storage'
import createFilter from 'redux-persist-transform-filter'
import { persistReducer } from 'redux-persist'
import { settingsReducer } from './settingsSlice'


const saveSubsetFilter = createFilter(
    'settings',
    ['app']
)

const persistConfig = {
    key: 'settings',
    storage: AsyncStorage,
    whitelist: ['app'],
    transforms: [saveSubsetFilter]
}

const persistedSearchReducer = persistReducer(persistConfig, settingsReducer)

export default persistedSearchReducer