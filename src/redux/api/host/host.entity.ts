import { ApiIdentifier } from '@types';
import { HostGallery } from '../gallery/gallery.entity';
import { HostEvent } from '../host-event/host-event.entity';
import { Media } from '../media/media.entity';
import { Venue } from '../venue/venue.entity';

export interface Host {
	host_id: ApiIdentifier;
	profile_image: Media | null;
	gallery: HostGallery[];
	venues: Venue[];
	events: HostEvent[];
	name: string;
	phone_number: string | null;
	company_name: string | null;
}
