import { ApiIdentifier } from '@types';
import { ProfileImage } from '../profile-image.entity';

export interface CreateArtistEventProfileImageQueryDto {
	event_uid: ApiIdentifier;
}

export interface CreateArtistEventProfileImageResponseDto
	extends ProfileImage {}
