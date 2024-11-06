import { PublicArtist } from '../artist';
import { Scene } from '../scene';

export interface ArtistSceneLink {
	readonly scene: Scene;
	readonly artist: PublicArtist;
}
