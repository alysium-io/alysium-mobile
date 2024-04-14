import { ApiIdentifier } from 'src/types';
import { Event } from '../event.entity';

export interface CreateEventBodyDto {
	host_id: ApiIdentifier;
	name: string;
}

export interface CreateEventResponseDto extends Event {}
