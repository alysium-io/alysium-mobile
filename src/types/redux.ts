import { Artist } from '@flux/api/artist/artist.entity';
import { Event } from '@flux/api/event/event.entity';
import { Host } from '@flux/api/host/host.entity';
import { User } from '@flux/api/user/user.entity';
import { Venue } from '@flux/api/venue/venue.entity';
import { ApiIdentifier } from './api';
import { Persona } from './enums';
import { ThemeMode } from './restyle';
import { SearchItem } from './search';
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
	recentSearches: SearchItem[];
};

export type AuthState = {
	stage: AuthStage;
};

export type UserState = {
	user: User | null;
};

export type PersonaState = {
	isLoading: boolean;
	activePersonaType: Persona;
	activePersonaId: ApiIdentifier | null;
};

export type ArtistState = {
	artist: Artist | null;
};

export type HostState = {
	host: Host | null;
	events: Event[] | null;
	venues: Venue[] | null;
};

export type GeneralState = {
	token: string | null;
	recentSearches: SearchItem[];
	personaId: ApiIdentifier | null;
	personaType: Persona | null;
};
