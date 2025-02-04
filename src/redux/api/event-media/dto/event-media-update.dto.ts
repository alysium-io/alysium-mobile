import { MediaType } from '@flux/api/media/types';
import { NanoId } from '@types';
import { EventMedia } from '../event-media.entity';

export interface UpdateEventMediaParamsDto {
	readonly artist_uid: NanoId;
	readonly event_uid: NanoId;
	readonly event_media_uid: NanoId;
}

export interface UpdateEventMediaBodyDto {
	readonly mediaType: MediaType;
}

export interface UpdateEventMediaResponseDto extends EventMedia {}
