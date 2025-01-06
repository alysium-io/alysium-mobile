import { Pagination } from '@flux/api/utils/pagination';
import { UserScenesFollowing } from '../user-scenes-following.entity';

export interface FindAllUserScenesFollowingQueryDto extends Pagination {}

export interface FindAllUserScenesFollowingResponseDto
	extends UserScenesFollowing {}
