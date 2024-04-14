import { Artist } from '../artist.entity';

export interface FindAllArtistsQueryDto {
	page: number;
	limit: number;
}

export interface FindAllArtistsResponseDto extends Artist {}
