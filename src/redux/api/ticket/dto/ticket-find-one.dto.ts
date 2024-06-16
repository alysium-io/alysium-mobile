import { ApiIdentifier } from '@types';
import { Ticket } from '../ticket.entity';

export interface FindOneTicketParamsDto {
	ticket_uid: ApiIdentifier;
}

export interface FindOneTicketQueryDto {
	ticket_collection_uid: ApiIdentifier;
}

export interface FindOneTicketResponseDto extends Ticket {}
