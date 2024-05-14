import { ApiIdentifier } from '@types';
import { Artist } from '../artist';
import { Event } from '../event';
import { Host } from '../host';
import { ContractStatus } from './types';

export interface Contract {
	contract_id: ApiIdentifier;
	host: Host;
	artist: Artist;
	event: Event;
	host_approved: boolean;
	artist_approved: boolean;
	status: ContractStatus;
	start_time: string;
	end_time: string;
	host_provides_equipment: boolean;
	additional_notes: string | null;
}
