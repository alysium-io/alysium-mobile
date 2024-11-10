import { NanoId } from '@types';
import { Ticket } from '../ticket.entity';

export interface CreateTicketBodyDto {
	ticket_collection_uid: NanoId;
	ticket_type_uid: NanoId;
}

export interface CreateTicketResponseDto extends Ticket {}
