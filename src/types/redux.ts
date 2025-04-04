import { NanoId } from './api';
import { Persona } from './enums';
import {
	ArtistAppBottomTabNavigatorParamList,
	UserAppBottomTabNavigatorParamList
} from './navigation';
import { ThemeMode } from './restyle';
import { ThemeName } from './themes';

export enum AuthStage {
	loggedOut = 'loggedOut',
	loggedIn = 'loggedIn',
	loading = 'loading',
	error = 'error'
}

export type ColorModeState = 'default' | 'alwaysLight' | 'alwaysDark';

export type PersistedAppState = {
	token: string | null;
	personaType: Persona;
	personaId: NanoId | null;
	themeName: ThemeName;
	themeMode: ThemeMode;
	colorModeState: ColorModeState;
	authStage: AuthStage;
	tab:
		| keyof ArtistAppBottomTabNavigatorParamList
		| keyof UserAppBottomTabNavigatorParamList;
};

export type TransientAppState = {
	soundEnabled: boolean;
};
