import { Pagination } from '@flux/api/utils/pagination';
import { ApiIdentifier } from '@types';
import { Ticket } from '../ticket.entity';

export interface FindAllTicketsQueryDto extends Pagination {
	ticket_collection_uid: ApiIdentifier;
	ticket_type_uid?: ApiIdentifier;
}

export interface FindAllTicketsResponseDto extends Ticket {}
