import { Pagination } from '@flux/api/utils/pagination';
import { SearchResponseDto, UserSearchItem } from '../search.entity';

export interface SearchUsersQueryDto extends Pagination {}

export interface SearchUsersBodyDto {
	q: string;
}

export interface SearchUsersResponseDto
	extends SearchResponseDto<UserSearchItem> {}
