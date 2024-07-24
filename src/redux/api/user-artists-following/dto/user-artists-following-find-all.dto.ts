import { UserArtistsFollowing } from '../user-artists-following.entity';

export interface FindAllUserArtistsFollowingQueryDto {
	page: number;
	limit: number;
}

export interface FindAllUserArtistsFollowingResponseDto
	extends UserArtistsFollowing {}
