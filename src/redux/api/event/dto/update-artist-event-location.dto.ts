import { ApiIdentifier } from '@types';
import { Event } from '../event.entity';

export interface UpdateArtistEventLocationParamsDto {
	artist_uid: ApiIdentifier;
	event_uid: ApiIdentifier;
}

export interface UpdateArtistEventLocationBodyDto {
	place_id: string | null;
}

export interface UpdateArtistEventLocationResponseDto extends Event {}
