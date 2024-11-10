import { NanoId } from '@types';
import { Event } from '../event.entity';

export interface UpdateArtistEventLocationParamsDto {
	artist_uid: NanoId;
	event_uid: NanoId;
}

export interface UpdateArtistEventLocationBodyDto {
	place_id: string | null;
}

export interface UpdateArtistEventLocationResponseDto extends Event {}
