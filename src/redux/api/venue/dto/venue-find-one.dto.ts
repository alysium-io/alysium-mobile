import { NanoId } from '@types';
import { Venue } from '../venue.entity';

export interface FindOneVenueParamsDto {
	venue_uid: NanoId;
}

export interface FindOneVenueResponseDto extends Venue {}
