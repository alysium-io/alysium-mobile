import { ApiIdentifier } from '@types';
import { TicketType } from '../ticket-type.entity';

export interface CreateTicketTypeBodyDto {
	ticket_collection_uid: ApiIdentifier;
	num_available: number | null;
	price: number | null;
	name: string | null;
	sale_start_time: string | null;
	sale_end_time: string | null;
}

export interface CreateTicketTypeResponseDto extends TicketType {}
