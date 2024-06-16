import { ApiIdentifier } from '@types';
import { TicketCollection } from '../ticket-collection';
import { TicketType } from '../ticket-type';
import { TicketStatus } from './types';

export interface Ticket {
	readonly ticket_uid: ApiIdentifier;
	readonly ticket_number: number;
	readonly ticket_status: TicketStatus;
	readonly ticket_type: TicketType;
	readonly ticket_collection: TicketCollection;
}
