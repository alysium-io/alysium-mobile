import { ApiIdentifier } from '@types';
import { Event } from '../event.entity';

export interface CreateEventBodyDto {
	host_uid: ApiIdentifier;
	name: string;
}

export interface CreateEventResponseDto extends Event {}
