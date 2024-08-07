import { Search } from '../search.entity';

export interface SearchArtistsBodyDto {
	q: string;
}

export interface SearchArtistsResponseDto {
	hits: Search[];
}
