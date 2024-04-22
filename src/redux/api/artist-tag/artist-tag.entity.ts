import { ApiIdentifier } from '@types';
import { Artist } from '../artist/artist.entity';
import { Tag } from '../tag/tag.entity';

export interface ArtistTag {
	artist_id: ApiIdentifier;
	tag_id: ApiIdentifier;
	tag: Tag;
	artist: Artist;
}
