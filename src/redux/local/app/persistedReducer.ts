import { AppState } from '@types';
import configurePersistor from '../utils/configurePersistor';
import { appReducer } from './slice';

const persistedAppReducer = configurePersistor<AppState>(
	'app',
	['token', 'personaType', 'personaId', 'themeName', 'mode', 'recentSearches'],
	appReducer
);

export default persistedAppReducer;
