import { ApiIdentifier } from '@types';
import { Ticket } from '../ticket.entity';

export interface DeleteTicketParamsDto {
	ticket_uid: ApiIdentifier;
}

export interface DeleteTicketQueryDto {
	ticket_collection_uid: ApiIdentifier;
}

export interface DeleteTicketResponseDto extends Ticket {}
