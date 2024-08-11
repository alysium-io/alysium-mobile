import { Pagination } from '@flux/api/utils/pagination';
import { ApiIdentifier } from '@types';
import { Event } from '../event.entity';

export interface FindAllEventsQueryDto extends Pagination {
	host_uid: ApiIdentifier;
}

export interface FindAllEventsResponseDto extends Event {}
