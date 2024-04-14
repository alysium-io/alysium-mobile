import { ApiIdentifier } from 'src/types';
import { Venue } from '../venue.entity';

export interface FindOneVenueParamsDto {
	venue_id: ApiIdentifier;
}

export interface FindOneVenueResponseDto extends Venue {}
