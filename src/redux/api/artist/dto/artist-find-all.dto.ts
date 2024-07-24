import { PrivateArtist } from '../artist.entity';

export interface PrivateFindAllArtistsQueryDto {
	page: number;
	limit: number;
}

export interface PrivateFindAllArtistsResponseDto extends PrivateArtist {}
