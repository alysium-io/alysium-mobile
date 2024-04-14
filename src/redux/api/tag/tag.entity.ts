import { ApiIdentifier } from '@types';
import { ArtistTag } from '../artist-tag/artist-tag.entity';

export interface Tag {
	tag_id: ApiIdentifier;
	artists: ArtistTag[];
	name: string;
}
