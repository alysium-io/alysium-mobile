import { ApiIdentifier } from '@types';
import { HostGallery } from '../gallery/gallery.entity';
import { HostEventLink } from '../host-event-link/host-event-link.entity';
import { Media } from '../media/media.entity';
import { Venue } from '../venue/venue.entity';

export interface Host {
	readonly host_uid: ApiIdentifier;
	readonly profile_image: Media | null;
	readonly gallery: HostGallery[];
	readonly venues: Venue[];
	readonly events: HostEventLink[];
	readonly name: string;
	readonly phone_number: string | null;
	readonly company_name: string | null;
}
