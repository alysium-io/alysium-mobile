import { ApiIdentifier } from '@types';
import { ProfileImage } from '../profile-image.entity';

export interface CreateArtistProfileImageQueryDto {
	artist_uid: ApiIdentifier;
}

export interface CreateArtistProfileImageResponseDto extends ProfileImage {}
