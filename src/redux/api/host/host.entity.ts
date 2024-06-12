import { ApiIdentifier } from '@types';
import { HostGallery } from '../gallery/gallery.entity';
import { HostEventLink } from '../host-event-link/host-event-link.entity';
import { Media } from '../media/media.entity';
import { Venue } from '../venue/venue.entity';

export interface Host {
	host_uid: ApiIdentifier;
	profile_image: Media | null;
	gallery: HostGallery[];
	venues: Venue[];
	events: HostEventLink[];
	name: string;
	phone_number: string | null;
	company_name: string | null;
}
