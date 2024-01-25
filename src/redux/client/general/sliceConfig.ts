import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import { generalStateReducer } from './generalStateSlice'


const persistConfig = {
    key: 'generalState',
    storage: AsyncStorage,
    whitelist: [
        'token',
        'recentSearches',
        'personaId',
        'personaType'
    ]
}

const persistedGeneralStateReducer = persistReducer(persistConfig, generalStateReducer)

export default persistedGeneralStateReducer