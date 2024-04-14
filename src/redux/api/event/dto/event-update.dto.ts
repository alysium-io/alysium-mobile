import { ApiIdentifier } from 'src/types';
import { Event } from '../event.entity';

export interface UpdateEventParamsDto {
	event_id: ApiIdentifier;
}

export interface UpdateEventBodyDto {
	name: string;
	start_time: string;
	end_time: string;
	doors_open_time: string;
}

export interface UpdateEventResponseDto extends Event {}
