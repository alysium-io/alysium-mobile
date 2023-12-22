import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user'
import { searchReducer } from './search'
import { themeReducer } from './theme'
import { settingsReducer } from './settings'
import { apiErrorUnauthorizedMiddleware } from './middleware'
import apiReducer, { api } from './api/base/baseApiSlice'
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
        user: userReducer,
        search: searchReducer,
        theme: themeReducer,
        settings: settingsReducer,
        [api.reducerPath]: apiReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
        .concat(api.middleware)
        .concat(apiErrorUnauthorizedMiddleware)
    }
})

const persistor = persistStore(store)

export { store, persistor }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useDispatch = () => useReduxDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector