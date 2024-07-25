import { UserTagsFollowing } from '../user-tags-following.entity';

export interface FindAllUserTagsFollowingQueryDto {
	page: number;
	limit: number;
}

export interface FindAllUserTagsFollowingResponseDto
	extends UserTagsFollowing {}
