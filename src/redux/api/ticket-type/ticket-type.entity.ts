export interface TicketType {
	readonly ticket_type_uid: string;
	readonly num_available: number | null;
	readonly price: number | null;
	readonly name: string;
	readonly sale_start_time: string;
	readonly sale_end_time: string;
}
