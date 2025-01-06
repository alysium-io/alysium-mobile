import { Gallery } from '../gallery/gallery.entity';
import { Location } from '../location';
import { Image } from '../media';
import { EventStatus } from './types';

export interface Event {
	readonly event_uid: string;
	readonly name: string;
	readonly about: string | null;
	readonly start_time: string | null;
	readonly end_time: string | null;
	readonly profile_image: Image | null;
	readonly location: Location | null;
	readonly status: EventStatus;
	readonly gallery: Gallery | null;
	readonly tickets_url: string | null;
}
