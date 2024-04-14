import { ApiIdentifier } from 'src/types';
import { Venue } from '../venue.entity';

export interface CreateVenueBodyDto {
	host_id: ApiIdentifier;
	name: string;
}

export interface CreateVenueResponseDto extends Venue {}
