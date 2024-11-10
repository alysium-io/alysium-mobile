import { NanoId } from '@types';
import { TicketType } from '../ticket-type/ticket-type.entity';

export interface TicketCollection {
	readonly ticket_collection_uid: NanoId;
	readonly name: string | null;
	readonly ticket_types: TicketType[];
}
