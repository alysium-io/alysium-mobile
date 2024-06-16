import { ApiIdentifier } from '@types';
import { Ticket } from '../ticket.entity';

export interface CreateTicketBodyDto {
	ticket_collection_uid: ApiIdentifier;
	ticket_type_uid: ApiIdentifier;
}

export interface CreateTicketResponseDto extends Ticket {}
