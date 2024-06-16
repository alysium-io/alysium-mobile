import { ApiIdentifier } from '@types';
import { TicketType } from '../ticket-type.entity';

export interface FindOneTicketTypeParamsDto {
	ticket_type_uid: ApiIdentifier;
}

export interface FindOneTicketTypeQueryDto {
	ticket_collection_uid: ApiIdentifier;
}

export interface FindOneTicketTypeResponseDto extends TicketType {}
