import { NanoId } from '@types';
import { ArtistTagLink } from '../artist-tag-link.entity';

export interface CreateArtistTagLinkBodyDto {
	artist_uid: NanoId;
	tag_uid: NanoId;
}

export interface CreateArtistTagLinkResponseDto extends ArtistTagLink {}
