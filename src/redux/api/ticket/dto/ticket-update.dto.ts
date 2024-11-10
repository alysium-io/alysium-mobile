import { NanoId } from '@types';
import { Ticket } from '../ticket.entity';
import { TicketStatus } from '../types';

export interface UpdateTicketParamsDto {
	ticket_uid: NanoId;
}

export interface UpdateTicketQueryDto {
	ticket_collection_uid: NanoId;
}

export interface UpdateTicketBodyDto {
	ticket_status: TicketStatus;
}

export interface UpdateTicketResponseDto extends Ticket {}
