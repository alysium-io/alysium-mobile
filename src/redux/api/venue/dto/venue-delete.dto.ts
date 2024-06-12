import { ApiIdentifier } from '@types';
import { Venue } from '../venue.entity';

export interface DeleteVenueParamsDto {
	venue_uid: ApiIdentifier;
}

export interface DeleteVenueResponseDto extends Venue {}
