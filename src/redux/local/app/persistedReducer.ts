import { AppState } from '@types';
import configurePersistor from '../utils/configurePersistor';
import { appReducer } from './slice';

const persistedAppReducer = configurePersistor<AppState>(
	'auth',
	['token', 'personaType', 'personaId', 'themeName', 'mode'],
	appReducer
);

export default persistedAppReducer;
