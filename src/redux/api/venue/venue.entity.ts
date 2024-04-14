import { ApiIdentifier } from '@types';
import { VenueGallery } from '../gallery/gallery.entity';
import { Host } from '../host/host.entity';
import { Media } from '../media/media.entity';

export interface Venue {
	venue_id: ApiIdentifier;
	profile_image: Media | null;
	host: Host;
	gallery: VenueGallery[];
	name: string;
	latitude: number | null;
	longitude: number | null;
	street: string | null;
	city: string | null;
	state: string | null;
	postal_code: string | null;
	country: string | null;
}
