import { Search } from '../search.entity';

export interface SearchArtistsQueryDto {
	q: string;
}

export interface SearchArtistsResponseDto extends Search {}
