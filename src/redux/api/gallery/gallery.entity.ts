import { ApiIdentifier } from '@types';
import { PrivateArtist } from '../artist/artist.entity';
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
	readonly gallery_uid: ApiIdentifier;
	readonly media: Media | null;
	readonly order: number;
}

export interface EventGallery extends BaseGallery {
	readonly event: Event;
}

export interface ArtistGallery extends BaseGallery {
	readonly artist: PrivateArtist;
}

export interface HostGallery extends BaseGallery {
	readonly host: Host;
}

export interface VenueGallery extends BaseGallery {
	readonly venue: Venue;
}

export interface UserGallery extends BaseGallery {
	readonly user: User;
}
