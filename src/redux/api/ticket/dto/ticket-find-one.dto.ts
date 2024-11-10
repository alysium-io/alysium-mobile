import { NanoId } from '@types';
import { Ticket } from '../ticket.entity';

export interface FindOneTicketParamsDto {
	ticket_uid: NanoId;
}

export interface FindOneTicketQueryDto {
	ticket_collection_uid: NanoId;
}

export interface FindOneTicketResponseDto extends Ticket {}
