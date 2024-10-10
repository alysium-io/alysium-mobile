import { ArtistTagLink } from '../artist-tag-link/artist-tag-link.entity';
import { ArtistGallery } from '../gallery/gallery.entity';
import { Location } from '../location/location.entity';
import { ProfileImage } from '../profile-image';
import { ArtistSpotifyData } from './types';

interface ArtistCommon {
	readonly artist_uid: string;
	readonly name: string;
	readonly phone_number: string | null;
	readonly bio: string | null;
	readonly is_following: boolean;
	readonly num_followers: number;
	readonly artist_rank: number;
	readonly profile_image: ProfileImage | null;
	readonly gallery: ArtistGallery[];
	readonly tags: ArtistTagLink[];
	readonly location: Location | null;
	readonly artist_spotify_data: ArtistSpotifyData;
}

export interface PublicArtist extends ArtistCommon {}

export interface PrivateArtist extends ArtistCommon {}
