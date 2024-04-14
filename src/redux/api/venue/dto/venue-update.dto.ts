import { ApiIdentifier } from 'src/types';
import { Venue } from '../venue.entity';

export interface UpdateVenueParamsDto {
	venue_id: ApiIdentifier;
}

export interface UpdateVenueBodyDto {
	name: string;
	latitude: number;
	longitude: number;
	street: string;
	city: string;
	state: string;
	postal_code: string;
	country: string;
}

export interface UpdateVenueResponseDto extends Venue {}
