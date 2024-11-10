import { NanoId } from '@types';
import { PrivateArtist } from '../artist.entity';

export interface UpdateArtistParamsDto {
	artist_uid: NanoId;
}

export interface UpdateArtistBodyDto {
	name: string;
	phone_number: string | null;
	bio: string | null;
}

export interface UpdateArtistResponseDto extends PrivateArtist {}
