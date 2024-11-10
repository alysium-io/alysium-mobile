import { NanoId } from '@types';
import { Ticket } from '../ticket.entity';

export interface DeleteTicketParamsDto {
	ticket_uid: NanoId;
}

export interface DeleteTicketQueryDto {
	ticket_collection_uid: NanoId;
}

export interface DeleteTicketResponseDto extends Ticket {}
