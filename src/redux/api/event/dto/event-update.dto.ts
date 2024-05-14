import { ApiIdentifier } from '@types';
import { Event } from '../event.entity';

export interface UpdateEventParamsDto {
	event_id: ApiIdentifier;
}

export interface UpdateEventBodyDto {
	name: string;
	start_time: string | null;
	end_time: string | null;
	doors_open_time: string | null;
	serves_alcohol: boolean;
	serves_food_and_drink: boolean;
	has_security: boolean;
	pets_allowed: boolean;
}

export interface UpdateEventResponseDto extends Event {}
