import { Location } from '../location';
import { Image } from '../media';
import { EventStatus } from './types';

export interface Event {
	readonly event_uid: string;
	readonly name: string;
	readonly about: string;
	readonly start_time: string;
	readonly end_time: string;
	readonly profile_image: Image | null;
	readonly location: Location | null;
	readonly status: EventStatus;
}
