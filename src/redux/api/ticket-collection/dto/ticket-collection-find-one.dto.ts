import { ApiIdentifier } from '@types';
import { TicketCollection } from '../ticket-collection.entity';

export interface FindOneTicketCollectionParamsDto {
	ticket_collection_uid: ApiIdentifier;
}

export interface FindOneTicketCollectionResponseDto extends TicketCollection {}
