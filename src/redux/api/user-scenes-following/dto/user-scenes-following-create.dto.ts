import { NanoId } from '@types';
import { UserScenesFollowing } from '../user-scenes-following.entity';

export interface CreateUserScenesFollowingBodyDto {
	scene_uid: NanoId;
}

export interface CreateUserScenesFollowingResponseDto
	extends UserScenesFollowing {}
