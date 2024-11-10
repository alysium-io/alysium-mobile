import { NanoId } from '@types';
import { TicketType } from '../ticket-type.entity';

export interface UpdateTicketTypeParamsDto {
	ticket_type_uid: NanoId;
}

export interface UpdateTicketTypeQueryDto {
	ticket_collection_uid: NanoId;
}

export interface UpdateTicketTypeBodyDto {
	name: string;
	num_available: number | null;
	price: number | null;
	sale_start_time: string | null;
	sale_end_time: string | null;
}

export interface UpdateTicketTypeResponseDto extends TicketType {}
