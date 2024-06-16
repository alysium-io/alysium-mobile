import { ApiIdentifier } from '@types';
import { Artist } from '../artist';
import { Event } from '../event';
import { Host } from '../host';
import { ContractStatus } from './types';

export interface Contract {
	readonly contract_uid: ApiIdentifier;
	readonly host: Host;
	readonly artist: Artist;
	readonly event: Event;
	readonly host_approved: boolean;
	readonly artist_approved: boolean;
	readonly status: ContractStatus;
	readonly start_time: string;
	readonly end_time: string;
	readonly host_provides_equipment: boolean;
	readonly additional_notes: string | null;
}
