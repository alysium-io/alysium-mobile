import { Artist } from '../artist';
import { Event } from '../event';

export interface Candidate {
	readonly event: Event;
	readonly artist: Artist;
	readonly created_at: Date;
}
