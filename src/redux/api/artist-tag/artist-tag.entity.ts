import { ApiIdentifier } from '@types';
import { Tag } from '../tag/tag.entity';

export interface ArtistTag {
	artist_id: ApiIdentifier;
	tag_id: ApiIdentifier;
	tag: Tag;
}
