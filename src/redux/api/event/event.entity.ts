import { Image } from '../media';

export interface Event {
	readonly event_uid: string;
	readonly name: string;
	readonly start_time: string;
	readonly end_time: string;
	readonly profile_image: Image | null;
}
