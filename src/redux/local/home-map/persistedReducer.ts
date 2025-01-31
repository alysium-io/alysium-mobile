import configurePersistor from '../utils/configurePersistor';
import { homeMapReducer } from './slice';
import { HomeMapState } from './types';

const persistedHomeMapReducer = configurePersistor<HomeMapState>(
	'homeMap',
	['region', 'city', 'defaultRegion'],
	homeMapReducer
);

export default persistedHomeMapReducer;
