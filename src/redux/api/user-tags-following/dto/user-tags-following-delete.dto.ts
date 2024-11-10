import { NanoId } from '@types';
import { UserTagsFollowing } from '../user-tags-following.entity';

export interface DeleteUserTagsFollowingParamsDto {
	tag_uid: NanoId;
}

export interface DeleteUserTagsFollowingResponseDto extends UserTagsFollowing {}
