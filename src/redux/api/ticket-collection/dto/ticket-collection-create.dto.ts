import { NanoId } from '@types';
import { TicketCollection } from '../ticket-collection.entity';

export interface CreateTicketCollectionQueryDto {
	event_uid: NanoId;
}

export interface CreateTicketCollectionBodyDto {
	name?: string | null;
}

export interface CreateTicketCollectionResponseDto extends TicketCollection {}
