import { NanoId } from '@types';
import { ArtistSceneLink } from '../artist-scene-link/artist-scene-link.entity';
import { Location } from '../location';

export interface Scene {
	readonly scene_uid: NanoId;
	readonly name: string;
	readonly country: string;
	readonly location: Location;
	readonly artists: ArtistSceneLink[];
	readonly num_followers: number;
	readonly num_events: number;
	readonly is_following: boolean;
}
