import { ApiIdentifier } from './api';
import { Persona } from './enums';
import { ThemeMode } from './restyle';
import { ThemeNames } from './themes';

export enum AuthStage {
	loggedOut = 'loggedOut',
	loggedIn = 'loggedIn',
	loading = 'loading',
	error = 'error'
}

export type AppState = {
	token: string | null;
	personaType: Persona;
	personaId: ApiIdentifier | null;
	themeName: ThemeNames;
	mode: ThemeMode;
	authStage: AuthStage;
};

export type KeyboardState = {
	height: number;
};
