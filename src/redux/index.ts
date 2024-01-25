import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth'
import { userReducer } from './user'
import { hostReducer } from './host'
import { artistReducer } from './artist'
import { searchReducer } from './search'
import { themeReducer } from './theme'
import { personaReducer } from './persona'
import { eventReducer } from './event'
import { generalStateReducer } from './client/general'
import { apiErrorUnauthorizedMiddleware } from './middleware'
import apiReducers, {
    authApiSlice,
    userApiSlice,
    hostApiSlice,
    artistApiSlice,
    tagApiSlice,
    searchApiSlice
} from './api'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistStore
} from 'redux-persist'
import {
    TypedUseSelectorHook,
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux'


const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        host: hostReducer,
        artist: artistReducer,
        search: searchReducer,
        theme: themeReducer,
        persona: personaReducer,
        event: eventReducer,
        general: generalStateReducer,
        ...apiReducers
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
        .concat(authApiSlice.middleware)
        .concat(userApiSlice.middleware)
        .concat(hostApiSlice.middleware)
        .concat(artistApiSlice.middleware)
        .concat(tagApiSlice.middleware)
        .concat(searchApiSlice.middleware)
        .concat(apiErrorUnauthorizedMiddleware)
    }
})

const persistor = persistStore(store)

export { store, persistor }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useDispatch = () => useReduxDispatch<AppDispatch>()
export const useSelector : TypedUseSelectorHook<RootState> = useReduxSelector