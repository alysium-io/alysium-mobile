import { ApiIdentifier } from '@types';
import { TicketCollection } from '../ticket-collection.entity';

export interface DeleteTicketCollectionParamsDto {
	ticket_collection_uid: ApiIdentifier;
}

export interface DeleteTicketCollectionResponseDto extends TicketCollection {}
