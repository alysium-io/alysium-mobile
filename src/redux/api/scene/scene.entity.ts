import { ApiIdentifier } from '@types';
import { ArtistSceneLink } from '../artist-scene-link/artist-scene-link.entity';
import { Location } from '../location';

export interface Scene {
	readonly scene_uid: ApiIdentifier;
	readonly name: string;
	readonly country: string;
	readonly location: Location;
	readonly artists: ArtistSceneLink[];
}
