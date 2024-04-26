import { ApiIdentifier } from '@types';
import { ArtistTag } from '../artist-tag.entity';

export interface DeleteArtistTagBodyDto {
	artist_id: ApiIdentifier;
	tag_id: ApiIdentifier;
}

export interface DeleteArtistTagResponseDto extends ArtistTag {}
