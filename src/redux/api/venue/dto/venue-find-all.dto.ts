import { ApiIdentifier } from '@types';
import { Venue } from '../venue.entity';

export interface FindAllVenuesQueryDto {
	host_uid: ApiIdentifier;
	page: number;
	limit: number;
}

export interface FindAllVenuesResponseDto extends Venue {}
