import { Pagination } from '@flux/api/utils/pagination';
import { SceneSearchItem, SearchResponseDto } from '../search.entity';

export interface SearchScenesQueryDto extends Pagination {}

export interface SearchScenesBodyDto {
	q: string;
}

export interface SearchScenesResponseDto
	extends SearchResponseDto<SceneSearchItem> {}
