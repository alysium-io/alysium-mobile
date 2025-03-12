import { MediaType } from '@flux/api/media/types';
import { NanoId } from '@types';
import { EventMedia } from '../event-media.entity';

export interface CreateEventMediaParamsDto {
	readonly artist_uid: NanoId;
	readonly event_uid: NanoId;
}

export interface CreateEventMediaBodyDto {
	readonly mediaType: MediaType;
	readonly timestamp?: string | null;
}

export interface CreateEventMediaResponseDto extends EventMedia {}
