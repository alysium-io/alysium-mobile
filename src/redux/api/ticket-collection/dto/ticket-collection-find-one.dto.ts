import { NanoId } from '@types';
import { TicketCollection } from '../ticket-collection.entity';

export interface FindOneTicketCollectionParamsDto {
	ticket_collection_uid: NanoId;
}

export interface FindOneTicketCollectionResponseDto extends TicketCollection {}
