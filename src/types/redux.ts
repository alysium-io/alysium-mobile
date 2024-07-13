import { ApiIdentifier } from './api';
import { Persona } from './enums';
import { ThemeMode } from './restyle';
import { ThemeName } from './themes';

export enum AuthStage {
	loggedOut = 'loggedOut',
	loggedIn = 'loggedIn',
	loading = 'loading',
	error = 'error'
}

export type ColorModeState = 'default' | 'alwaysLight' | 'alwaysDark';

export type AppState = {
	token: string | null;
	personaType: Persona;
	personaId: ApiIdentifier | null;
	themeName: ThemeName;
	themeMode: ThemeMode;
	colorModeState: ColorModeState;
	authStage: AuthStage;
};
