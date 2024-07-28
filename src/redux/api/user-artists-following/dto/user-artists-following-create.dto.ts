import { ApiIdentifier } from '@types';
import { UserArtistsFollowing } from '../user-artists-following.entity';

export interface CreateUserArtistsFollowingBodyDto {
	artist_uid: ApiIdentifier;
}

export interface CreateUserArtistsFollowingResponseDto
	extends UserArtistsFollowing {}
