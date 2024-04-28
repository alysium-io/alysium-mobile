import { ApiIdentifier } from '@types';
import { EventGallery } from '../gallery/gallery.entity';
import { HostEvent } from '../host-event/host-event.entity';
import { Media } from '../media/media.entity';
import { Venue } from '../venue';

export interface Event {
	event_id: ApiIdentifier;
	profile_image: Media | null;
	hosts: HostEvent[];
	gallery: EventGallery[];
	name: string;
	start_time: string | null;
	end_time: string | null;
	doors_open_time: string | null;
	serves_alcohol: boolean;
	serves_food_and_drink: boolean;
	has_security: boolean;
	pets_allowed: boolean;
	venue: Venue | null;
}
