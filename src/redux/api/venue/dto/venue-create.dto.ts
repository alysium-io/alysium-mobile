import { ApiIdentifier } from '@types';
import { Venue } from '../venue.entity';

export interface CreateVenueBodyDto {
	host_uid: ApiIdentifier;
	name: string;
}

export interface CreateVenueResponseDto extends Venue {}
