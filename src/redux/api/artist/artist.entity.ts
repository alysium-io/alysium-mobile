import { ApiIdentifier } from '@types';
import { ArtistTagLink } from '../artist-tag-link/artist-tag-link.entity';
import { ArtistGallery } from '../gallery/gallery.entity';
import { Location } from '../location/location.entity';
import { Media } from '../media/media.entity';

export interface Artist {
	artist_id: ApiIdentifier;
	name: string;
	profile_image: Media | null;
	gallery: ArtistGallery[];
	tags: ArtistTagLink[];
	location: Location | null;
}
