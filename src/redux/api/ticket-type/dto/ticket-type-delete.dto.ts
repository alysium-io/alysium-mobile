import { NanoId } from '@types';
import { TicketType } from '../ticket-type.entity';

export interface DeleteTicketTypeParamsDto {
	ticket_type_uid: NanoId;
}

export interface DeleteTicketTypeQueryDto {
	ticket_collection_uid: NanoId;
}

export interface DeleteTicketTypeResponseDto extends TicketType {}
