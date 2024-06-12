import { ApiIdentifier } from '@types';
import { Event } from '../event.entity';

export interface UpdateEventVenueParamsDto {
	event_uid: ApiIdentifier;
}

export interface UpdateEventVenueBodyDto {
	venue_uid: ApiIdentifier;
}

export interface UpdateEventVenueResponseDto extends Event {}
