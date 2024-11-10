import { NanoId } from '@types';
import { ProfileImage } from '../profile-image.entity';

export interface CreateArtistEventProfileImageQueryDto {
	event_uid: NanoId;
}

export interface CreateArtistEventProfileImageResponseDto
	extends ProfileImage {}
