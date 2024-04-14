import { ApiIdentifier } from 'src/types';
import { Event } from '../event.entity';

export interface FindOneEventParamsDto {
	event_id: ApiIdentifier;
}

export interface FindOneEventResponseDto extends Event {}
