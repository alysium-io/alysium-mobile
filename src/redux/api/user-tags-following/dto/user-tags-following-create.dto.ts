import { ApiIdentifier } from '@types';
import { UserTagsFollowing } from '../user-tags-following.entity';

export interface CreateUserTagsFollowingBodyDto {
	tag_uid: ApiIdentifier;
}

export interface CreateUserTagsFollowingResponseDto extends UserTagsFollowing {}
