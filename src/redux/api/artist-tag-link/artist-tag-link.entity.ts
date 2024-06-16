import { ApiIdentifier } from '@types';
import { Artist } from '../artist/artist.entity';
import { Tag } from '../tag/tag.entity';

export interface ArtistTagLink {
	readonly artist_uid: ApiIdentifier;
	readonly tag_uid: ApiIdentifier;
	readonly tag: Tag;
	readonly artist: Artist;
}
