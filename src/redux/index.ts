import { configureStore } from '@reduxjs/toolkit';
import {
	TypedUseSelectorHook,
	useDispatch as useReduxDispatch,
	useSelector as useReduxSelector
} from 'react-redux';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistStore
} from 'redux-persist';

import { serviceApi } from './api/base';
import { persistedAppReducer } from './local/app';
import { persistedArrayReducers } from './local/arrays/configPersistedArrays';
import { persistedHomeMapReducer } from './local/home-map';
import accountSuspendedMiddleware from './middleware/accountSuspendedMiddleware';
import apiErrorUnauthorizedMiddleware from './middleware/apiErrorUnauthorizedMiddleware';

const store = configureStore({
	reducer: {
		persistedApp: persistedAppReducer,
		persistedHomeMap: persistedHomeMapReducer,
		...persistedArrayReducers,
		[serviceApi.reducerPath]: serviceApi.reducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
			.concat(serviceApi.middleware)
			.concat(apiErrorUnauthorizedMiddleware)
			.concat(accountSuspendedMiddleware);
	}
});

const persistor = persistStore(store);

export { persistor, store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
