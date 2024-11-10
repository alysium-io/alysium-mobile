import { NanoId } from '@types';
import { UserTagsFollowing } from '../user-tags-following.entity';

export interface CreateUserTagsFollowingBodyDto {
	tag_uid: NanoId;
}

export interface CreateUserTagsFollowingResponseDto extends UserTagsFollowing {}
