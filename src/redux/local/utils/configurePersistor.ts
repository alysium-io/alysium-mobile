import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

function configurePersistor<T>(
	name: string,
	whitelist: string[],
	reducer: Reducer
) {
	return persistReducer<T>(
		{
			key: name,
			storage: AsyncStorage,
			whitelist
		},
		reducer
	);
}

export default configurePersistor;
