import { ApiIdentifier } from '@types';
import { Artist } from '../artist/artist.entity';
import { Tag } from '../tag/tag.entity';

export interface ArtistTagLink {
	artist_uid: ApiIdentifier;
	tag_uid: ApiIdentifier;
	tag: Tag;
	artist: Artist;
}
