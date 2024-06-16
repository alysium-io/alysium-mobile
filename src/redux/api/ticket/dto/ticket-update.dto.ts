import { ApiIdentifier } from '@types';
import { Ticket } from '../ticket.entity';
import { TicketStatus } from '../types';

export interface UpdateTicketParamsDto {
	ticket_uid: ApiIdentifier;
}

export interface UpdateTicketQueryDto {
	ticket_collection_uid: ApiIdentifier;
}

export interface UpdateTicketBodyDto {
	ticket_status: TicketStatus;
}

export interface UpdateTicketResponseDto extends Ticket {}
