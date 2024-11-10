import { NanoId } from '@types';
import { TicketCollection } from '../ticket-collection.entity';

export interface DeleteTicketCollectionParamsDto {
	ticket_collection_uid: NanoId;
}

export interface DeleteTicketCollectionResponseDto extends TicketCollection {}
