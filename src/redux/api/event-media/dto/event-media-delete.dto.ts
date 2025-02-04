import { NanoId } from '@types';
import { EventMedia } from '../event-media.entity';

export interface DeleteEventMediaParamsDto {
	readonly artist_uid: NanoId;
	readonly event_uid: NanoId;
	readonly event_media_uid: NanoId;
}

export interface DeleteEventMediaResponseDto extends EventMedia {}
