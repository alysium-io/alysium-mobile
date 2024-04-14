import { HostEvent } from '../host-event.entity';

export interface FindAllHostEventsQueryDto {
	page: number;
	limit: number;
}

export interface FindAllHostEventsResponseDto extends HostEvent {}
