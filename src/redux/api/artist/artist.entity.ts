import { ArtistTagLink } from '../artist-tag-link/artist-tag-link.entity';
import { ArtistGallery } from '../gallery/gallery.entity';
import { Location } from '../location/location.entity';
import { Media } from '../media/media.entity';

interface ArtistCommon {
	readonly artist_uid: string;
	readonly name: string;
	readonly profile_image: Media | null;
	readonly gallery: ArtistGallery[];
	readonly tags: ArtistTagLink[];
	readonly location: Location | null;
}

export interface PublicArtist extends ArtistCommon {}

export interface PrivateArtist extends ArtistCommon {}
