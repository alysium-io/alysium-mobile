import { NanoId } from '@types';
import { Multimedia } from '../media';

export interface EventMedia {
	readonly event_media_uid: NanoId;
	readonly multimedia: Multimedia;
	readonly created_at: Date;
	readonly updated_at: Date;
}
