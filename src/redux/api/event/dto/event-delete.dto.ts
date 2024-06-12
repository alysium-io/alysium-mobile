import { ApiIdentifier } from '@types';
import { Event } from '../event.entity';

export interface DeleteEventParamsDto {
	event_uid: ApiIdentifier;
}

export interface DeleteEventResponseDto extends Event {}
