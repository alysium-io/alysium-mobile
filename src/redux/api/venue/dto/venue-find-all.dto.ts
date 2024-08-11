import { Pagination } from '@flux/api/utils/pagination';
import { ApiIdentifier } from '@types';
import { Venue } from '../venue.entity';

export interface FindAllVenuesQueryDto extends Pagination {
	host_uid: ApiIdentifier;
}

export interface FindAllVenuesResponseDto extends Venue {}
