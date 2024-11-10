import { NanoId } from '@types';
import { ArtistTagLink } from '../artist-tag-link.entity';

export interface DeleteArtistTagLinkBodyDto {
	artist_uid: NanoId;
	tag_uid: NanoId;
}

export interface DeleteArtistTagLinkResponseDto extends ArtistTagLink {}
