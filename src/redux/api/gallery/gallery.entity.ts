import { ApiIdentifier } from '@types';
import { Artist } from '../artist/artist.entity';
import { Event } from '../event/event.entity';
import { Host } from '../host/host.entity';
import { Media } from '../media/media.entity';
import { User } from '../user/user.entity';
import { Venue } from '../venue/venue.entity';

export enum GalleryRefType {
	user = 'user',
	host = 'host',
	artist = 'artist',
	venue = 'venue',
	event = 'event'
}

export interface BaseGallery {
	gallery_uid: ApiIdentifier;
	media: Media | null;
	order: number;
}

export interface EventGallery extends BaseGallery {
	event: Event;
}

export interface ArtistGallery extends BaseGallery {
	artist: Artist;
}

export interface HostGallery extends BaseGallery {
	host: Host;
}

export interface VenueGallery extends BaseGallery {
	venue: Venue;
}

export interface UserGallery extends BaseGallery {
	user: User;
}
