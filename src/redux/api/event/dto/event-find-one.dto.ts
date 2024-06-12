import { ApiIdentifier } from '@types';
import { Event } from '../event.entity';

export interface FindOneEventParamsDto {
	event_uid: ApiIdentifier;
}

export interface FindOneEventResponseDto extends Event {}
