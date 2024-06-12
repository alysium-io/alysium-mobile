import { ApiIdentifier } from '@types';
import { Event } from '../event.entity';

export interface FindAllEventsQueryDto {
	host_uid: ApiIdentifier;
	page: number;
	limit: number;
}

export interface FindAllEventsResponseDto extends Event {}
