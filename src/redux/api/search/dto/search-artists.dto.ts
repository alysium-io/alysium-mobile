import { SearchResponseDto } from '../search.entity';

export interface SearchArtistsBodyDto {
	q: string;
}

export interface SearchArtistsResponseDto extends SearchResponseDto {}
