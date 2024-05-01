import { ApiIdentifier } from '@types';
import { Artist } from '../artist';
import { Event } from '../event';

export interface Candidate {
	event_id: ApiIdentifier;
	artist_id: ApiIdentifier;
	artist: Artist;
	event: Event;
	created_at: string;
	updated_at: string;
}
