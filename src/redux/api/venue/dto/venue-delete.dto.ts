import { NanoId } from '@types';
import { Venue } from '../venue.entity';

export interface DeleteVenueParamsDto {
	venue_uid: NanoId;
}

export interface DeleteVenueResponseDto extends Venue {}
