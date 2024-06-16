import { ApiIdentifier } from '@types';
import { EventGallery } from '../gallery/gallery.entity';
import { HostEventLink } from '../host-event-link/host-event-link.entity';
import { Media } from '../media/media.entity';
import { Venue } from '../venue';

export interface Event {
	readonly event_uid: ApiIdentifier;
	readonly profile_image: Media | null;
	readonly hosts: HostEventLink[];
	readonly gallery: EventGallery[];
	readonly name: string;
	readonly start_time: string | null;
	readonly end_time: string | null;
	readonly doors_open_time: string | null;
	readonly serves_alcohol: boolean;
	readonly serves_food_and_drink: boolean;
	readonly has_security: boolean;
	readonly pets_allowed: boolean;
	readonly venue: Venue | null;
	readonly num_candidates: number;
	readonly num_contracts: number;
	readonly ticket_collection_uid: ApiIdentifier | null;
}
