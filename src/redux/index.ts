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
import { artistApiSlice } from './api/artist';
import { artistTagApiSlice } from './api/artist-tag';
import { candidateApiSlice } from './api/candidate';
import { eventApiSlice } from './api/event';
import { galleryApiSlice } from './api/gallery';
import { hostApiSlice } from './api/host';
import { hostEventApiSlice } from './api/host-event';
import { locationApiSlice } from './api/location';
import { mediaApiSlice } from './api/media';
import { searchApiSlice } from './api/search';
import { tagApiSlice } from './api/tag';
import { userApiSlice } from './api/user';
import { venueApiSlice } from './api/venue';
import { persistedAppReducer, persistedSearchReducer } from './local';

import { apiErrorUnauthorizedMiddleware } from './middleware';

const store = configureStore({
	reducer: {
		persistedApp: persistedAppReducer,
		persistedSearch: persistedSearchReducer,
		[artistApiSlice.reducerPath]: artistApiSlice.reducer,
		[hostApiSlice.reducerPath]: hostApiSlice.reducer,
		[venueApiSlice.reducerPath]: venueApiSlice.reducer,
		[eventApiSlice.reducerPath]: eventApiSlice.reducer,
		[candidateApiSlice.reducerPath]: candidateApiSlice.reducer,
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
			.concat(candidateApiSlice.middleware)
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
