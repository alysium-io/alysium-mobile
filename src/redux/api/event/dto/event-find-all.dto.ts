import { Event } from '../event.entity';

export interface FindAllEventsQueryDto {
	page: number;
	limit: number;
}

export interface FindAllEventsResponseDto extends Event {}
