import { ApiIdentifier } from '@types';
import { TicketType } from '../ticket-type.entity';

export interface UpdateTicketTypeParamsDto {
	ticket_type_uid: ApiIdentifier;
}

export interface UpdateTicketTypeQueryDto {
	ticket_collection_uid: ApiIdentifier;
}

export interface UpdateTicketTypeBodyDto {
	name?: string;
	num_available?: number;
	price?: number;
	sale_start_time?: string;
	sale_end_time?: string;
}

export interface UpdateTicketTypeResponseDto extends TicketType {}
