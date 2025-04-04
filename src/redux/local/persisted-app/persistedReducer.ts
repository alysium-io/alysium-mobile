import { PersistedAppState } from '@types';
import configurePersistor from '../utils/configurePersistor';
import persistedAppSlice from './slice';

export default configurePersistor<PersistedAppState>(
	'app',
	[
		'token',
		'personaType',
		'personaId',
		'themeName',
		'themeMode',
		'colorModeState',
		'tab'
	],
	persistedAppSlice.reducer
);
