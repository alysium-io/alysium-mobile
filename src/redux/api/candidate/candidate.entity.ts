import { ApiIdentifier } from '@types';
import { Artist } from '../artist';
import { Event } from '../event';

export interface Candidate {
	artist_uid: ApiIdentifier;
	event_uid: ApiIdentifier;
	event: Event;
	artist: Artist;
	created_at: Date;
}
