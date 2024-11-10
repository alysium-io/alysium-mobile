import { NanoId } from '@types';
import { PrivateArtist } from '../artist.entity';

export interface UpdateArtistLocationParamsDto {
	artist_uid: NanoId;
}

export interface UpdateArtistLocationBodyDto {
	location_uid: NanoId;
}

export interface UpdateArtistLocationResponseDto extends PrivateArtist {}
