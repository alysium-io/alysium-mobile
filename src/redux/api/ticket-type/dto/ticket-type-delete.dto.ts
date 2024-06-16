import { ApiIdentifier } from '@types';
import { TicketType } from '../ticket-type.entity';

export interface DeleteTicketTypeParamsDto {
	ticket_type_uid: ApiIdentifier;
}

export interface DeleteTicketTypeQueryDto {
	ticket_collection_uid: ApiIdentifier;
}

export interface DeleteTicketTypeResponseDto extends TicketType {}
