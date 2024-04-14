import { ApiIdentifier } from 'src/types';
import { ArtistTag } from '../artist-tag.entity';

export interface CreateArtistTagBodyDto {
	artist_id: ApiIdentifier;
	tag_id: ApiIdentifier;
}

export interface CreateArtistTagResponseDto extends ArtistTag {}
