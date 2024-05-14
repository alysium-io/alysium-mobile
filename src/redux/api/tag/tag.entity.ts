import { ApiIdentifier } from '@types';
import { ArtistTagLink } from '../artist-tag-link/artist-tag-link.entity';

export interface Tag {
	tag_id: ApiIdentifier;
	artists: ArtistTagLink[];
	name: string;
}
