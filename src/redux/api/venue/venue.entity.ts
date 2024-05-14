import { ApiIdentifier } from '@types';
import { VenueGallery } from '../gallery/gallery.entity';
import { Host } from '../host/host.entity';
import { Media } from '../media/media.entity';
import { VenueType } from './types';

export interface Venue {
	venue_id: ApiIdentifier;
	profile_image: Media | null;
	host: Host;
	gallery: VenueGallery[];
	name: string;
	phone_number: string | null;
	capacity: number;
	latitude: number | null;
	longitude: number | null;
	street: string | null;
	city: string | null;
	state: string | null;
	postal_code: string | null;
	country: string | null;
	description: string | null;
	venue_type: VenueType | null;
}
