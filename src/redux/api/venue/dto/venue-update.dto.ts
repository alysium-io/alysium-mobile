import { ApiIdentifier } from '@types';
import { Venue } from '../venue.entity';

export interface UpdateVenueParamsDto {
	venue_id: ApiIdentifier;
}

export interface UpdateVenueBodyDto {
	name: string;
	phone_number: string;
	capacity: number;
	latitude: number;
	longitude: number;
	street: string;
	city: string;
	state: string;
	postal_code: string;
	country: string;
	description: string;
}

export interface UpdateVenueResponseDto extends Venue {}
