import { Pagination } from '@flux/api/utils/pagination';
import { NanoId } from '@types';
import { Ticket } from '../ticket.entity';

export interface FindAllTicketsQueryDto extends Pagination {
	ticket_collection_uid: NanoId;
	ticket_type_uid?: NanoId;
}

export interface FindAllTicketsResponseDto extends Ticket {}
