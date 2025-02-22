import { ArtistSceneLink } from '../artist-scene-link/artist-scene-link.entity';
import { ArtistTagLink } from '../artist-tag-link/artist-tag-link.entity';
import { Contact } from '../contact';
import { ExternalUrl } from '../external-url/external-url.entity';
import { Location } from '../location/location.entity';
import { ProfileImage } from '../profile-image';
import { UserArtistLink } from '../user-artist-link/user-artist-link.entity';
import { ArtistSpotifyData } from './types';

interface ArtistCommon {
	readonly artist_uid: string;
	readonly name: string;
	readonly phone_number: string | null;
	readonly bio: string | null;
	readonly is_following: boolean;
	readonly is_blocked: boolean;
	readonly num_followers: number;
	readonly num_events: number;
	readonly profile_image: ProfileImage | null;
	readonly tags: ArtistTagLink[];
	readonly location: Location | null;
	readonly artist_spotify_data: ArtistSpotifyData | null;
	readonly external_urls: ExternalUrl[];
	readonly scene: ArtistSceneLink | null;
	readonly contacts: Contact[];
	readonly user: UserArtistLink | null;
}

export interface PublicArtist extends ArtistCommon {}

export interface PrivateArtist extends ArtistCommon {}
