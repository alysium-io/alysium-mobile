import { Pagination } from '@flux/api/utils/pagination';
import { NanoId } from '@types';
import { Venue } from '../venue.entity';

export interface FindAllVenuesQueryDto extends Pagination {
	host_uid: NanoId;
}

export interface FindAllVenuesResponseDto extends Venue {}
