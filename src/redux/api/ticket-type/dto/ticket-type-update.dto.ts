import { ApiIdentifier } from '@types';
import { TicketType } from '../ticket-type.entity';

export interface UpdateTicketTypeParamsDto {
	ticket_type_uid: ApiIdentifier;
}

export interface UpdateTicketTypeQueryDto {
	ticket_collection_uid: ApiIdentifier;
}

export interface UpdateTicketTypeBodyDto {
	name: string;
	num_available: number | null;
	price: number | null;
	sale_start_time: string | null;
	sale_end_time: string | null;
}

export interface UpdateTicketTypeResponseDto extends TicketType {}
