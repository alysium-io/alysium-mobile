import { ApiIdentifier } from '@types';
import { Artist } from '../artist';
import { Event } from '../event';

export interface Candidate {
	artist_id: ApiIdentifier;
	event_id: ApiIdentifier;
	event: Event;
	artist: Artist;
	created_at: Date;
}
