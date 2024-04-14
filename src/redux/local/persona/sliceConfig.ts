import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import { personaReducer } from './personaSlice'


const persistConfig = {
    key: 'persona',
    storage: AsyncStorage,
    whitelist: [
        'activePersonaType',
        'activePersonaId'
    ]
}

const persistedSearchReducer = persistReducer(persistConfig, personaReducer)

export default persistedSearchReducer