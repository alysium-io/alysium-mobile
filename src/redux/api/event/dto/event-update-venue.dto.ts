import { ApiIdentifier } from '@types';
import { Event } from '../event.entity';

export interface UpdateEventVenueParamsDto {
	event_id: ApiIdentifier;
}

export interface UpdateEventVenueBodyDto {
	venue_id: ApiIdentifier;
}

export interface UpdateEventVenueResponseDto extends Event {}
