import { NanoId } from '@types';
import { Venue } from '../venue.entity';

export interface CreateVenueBodyDto {
	host_uid: NanoId;
	name: string;
}

export interface CreateVenueResponseDto extends Venue {}
