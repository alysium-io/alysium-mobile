import { Event } from '../event.entity';
import { ArtistEventParamsDto } from './params';

export interface PatchArtistEventLocationParamsDto
	extends ArtistEventParamsDto {}

export interface PatchArtistEventLocationBodyDto {
	place_id: string | null;
}

export interface PatchArtistEventLocationResponseDto extends Event {}
