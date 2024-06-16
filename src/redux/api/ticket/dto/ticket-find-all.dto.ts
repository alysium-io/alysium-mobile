import { ApiIdentifier } from '@types';
import { Ticket } from '../ticket.entity';

export interface FindAllTicketsQueryDto {
	page: number;
	limit: number;
	ticket_collection_uid: ApiIdentifier;
	ticket_type_uid?: ApiIdentifier;
}

export interface FindAllTicketsResponseDto extends Ticket {}
