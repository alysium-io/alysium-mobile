import { ApiIdentifier } from '@types';
import { Artist } from '../artist';
import { Event } from '../event';

export interface Candidate {
	readonly artist_uid: ApiIdentifier;
	readonly event_uid: ApiIdentifier;
	readonly event: Event;
	readonly artist: Artist;
	readonly created_at: Date;
}
