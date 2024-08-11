import { Pagination } from '@flux/api/utils/pagination';
import { UserArtistsFollowing } from '../user-artists-following.entity';

export interface FindAllUserArtistsFollowingQueryDto extends Pagination {}

export interface FindAllUserArtistsFollowingResponseDto
	extends UserArtistsFollowing {}
