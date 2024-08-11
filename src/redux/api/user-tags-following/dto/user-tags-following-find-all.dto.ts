import { Pagination } from '@flux/api/utils/pagination';
import { UserTagsFollowing } from '../user-tags-following.entity';

export interface FindAllUserTagsFollowingQueryDto extends Pagination {}

export interface FindAllUserTagsFollowingResponseDto
	extends UserTagsFollowing {}
