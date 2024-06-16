import { ApiIdentifier } from '@types';
import { ArtistTagLink } from '../artist-tag-link/artist-tag-link.entity';

export interface Tag {
	readonly tag_uid: ApiIdentifier;
	readonly artists: ArtistTagLink[];
	readonly name: string;
}
