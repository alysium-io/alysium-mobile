import AsyncStorage from '@react-native-async-storage/async-storage'
import createFilter from 'redux-persist-transform-filter'
import { persistReducer } from 'redux-persist'
import { userReducer } from './userSlice'


const saveSubsetFilter = createFilter(
    'user',
    ['token']
)

const persistConfig = {
    key: 'user',
    storage: AsyncStorage,
    whitelist: ['token'],
    transforms: [saveSubsetFilter]
}

const persistedSearchReducer = persistReducer(persistConfig, userReducer)

export default persistedSearchReducer
