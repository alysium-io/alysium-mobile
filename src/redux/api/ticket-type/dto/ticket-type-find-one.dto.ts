import { NanoId } from '@types';
import { TicketType } from '../ticket-type.entity';

export interface FindOneTicketTypeParamsDto {
	ticket_type_uid: NanoId;
}

export interface FindOneTicketTypeQueryDto {
	ticket_collection_uid: NanoId;
}

export interface FindOneTicketTypeResponseDto extends TicketType {}
