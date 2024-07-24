import { PublicArtist } from '../artist';

export interface UserArtistsFollowing {
	readonly artist: PublicArtist;
	readonly created_at: Date;
}
