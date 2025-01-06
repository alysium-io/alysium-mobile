import { NanoId } from '@types';
import { UserScenesFollowing } from '../user-scenes-following.entity';

export interface DeleteUserScenesFollowingParamsDto {
	scene_uid: NanoId;
}

export interface DeleteUserScenesFollowingResponseDto
	extends UserScenesFollowing {}
