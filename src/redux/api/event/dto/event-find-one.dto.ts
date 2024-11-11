import { EventLink } from '@flux/api/event-link/event-link.entity';
import { NanoId } from '@types';

export interface FindOneEventParamsDto {
	readonly event_uid: NanoId;
}

export interface FindOneEventResponseDto extends EventLink {}
