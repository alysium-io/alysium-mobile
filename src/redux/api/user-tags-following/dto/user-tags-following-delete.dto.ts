import { ApiIdentifier } from '@types';
import { UserTagsFollowing } from '../user-tags-following.entity';

export interface DeleteUserTagsFollowingParamsDto {
	tag_uid: ApiIdentifier;
}

export interface DeleteUserTagsFollowingResponseDto extends UserTagsFollowing {}
