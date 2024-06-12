import { ApiIdentifier } from '@types';
import { Artist } from '../artist.entity';

export interface UpdateArtistLocationParamsDto {
	artist_uid: ApiIdentifier;
}

export interface UpdateArtistLocationBodyDto {
	location_uid: ApiIdentifier;
}

export interface UpdateArtistLocationResponseDto extends Artist {}
