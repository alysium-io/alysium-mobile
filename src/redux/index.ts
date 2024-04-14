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
import {
	artistApiSlice,
	artistTagApiSlice,
	eventApiSlice,
	galleryApiSlice,
	hostApiSlice,
	hostEventApiSlice,
	locationApiSlice,
	mediaApiSlice,
	searchApiSlice,
	tagApiSlice,
	userApiSlice,
	venueApiSlice
} from './api';
import {
	authReducer,
	eventReducer,
	hostReducer,
	persistedAppReducer,
	personaReducer,
	searchReducer,
	themeReducer,
	userReducer
} from './local';

import { apiErrorUnauthorizedMiddleware } from './middleware';

const store = configureStore({
	reducer: {
		persistedApp: persistedAppReducer,
		auth: authReducer,
		user: userReducer,
		host: hostReducer,
		search: searchReducer,
		theme: themeReducer,
		persona: personaReducer,
		event: eventReducer,
		[artistApiSlice.reducerPath]: artistApiSlice.reducer,
		[hostApiSlice.reducerPath]: hostApiSlice.reducer,
		[venueApiSlice.reducerPath]: venueApiSlice.reducer,
		[eventApiSlice.reducerPath]: eventApiSlice.reducer,
		[artistTagApiSlice.reducerPath]: artistTagApiSlice.reducer,
		[galleryApiSlice.reducerPath]: galleryApiSlice.reducer,
		[hostEventApiSlice.reducerPath]: hostEventApiSlice.reducer,
		[locationApiSlice.reducerPath]: locationApiSlice.reducer,
		[mediaApiSlice.reducerPath]: mediaApiSlice.reducer,
		[tagApiSlice.reducerPath]: tagApiSlice.reducer,
		[userApiSlice.reducerPath]: userApiSlice.reducer,
		[searchApiSlice.reducerPath]: searchApiSlice.reducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
			.concat(artistApiSlice.middleware)
			.concat(hostApiSlice.middleware)
			.concat(venueApiSlice.middleware)
			.concat(eventApiSlice.middleware)
			.concat(artistTagApiSlice.middleware)
			.concat(galleryApiSlice.middleware)
			.concat(hostEventApiSlice.middleware)
			.concat(locationApiSlice.middleware)
			.concat(mediaApiSlice.middleware)
			.concat(tagApiSlice.middleware)
			.concat(userApiSlice.middleware)
			.concat(searchApiSlice.middleware)
			.concat(apiErrorUnauthorizedMiddleware);
	}
});

const persistor = persistStore(store);

export { persistor, store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
