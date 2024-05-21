import { KeyboardState } from '@types';
import configurePersistor from '../utils/configurePersistor';
import { keyboardReducer } from './slice';

const persistedKeyboardReducer = configurePersistor<KeyboardState>(
	'keyboard',
	['height'],
	keyboardReducer
);

export default persistedKeyboardReducer;
