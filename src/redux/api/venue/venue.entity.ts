import { ApiIdentifier } from '@types';
import { VenueGallery } from '../gallery/gallery.entity';
import { Host } from '../host/host.entity';
import { Media } from '../media/media.entity';
import { VenueType } from './types';

export interface Venue {
	readonly venue_uid: ApiIdentifier;
	readonly profile_image: Media | null;
	readonly host: Host;
	readonly gallery: VenueGallery[];
	readonly name: string;
	readonly phone_number: string | null;
	readonly capacity: number;
	readonly latitude: number | null;
	readonly longitude: number | null;
	readonly street: string | null;
	readonly city: string | null;
	readonly state: string | null;
	readonly postal_code: string | null;
	readonly country: string | null;
	readonly description: string | null;
	readonly venue_type: VenueType | null;
}
