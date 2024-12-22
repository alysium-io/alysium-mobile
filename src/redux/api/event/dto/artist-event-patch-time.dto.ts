import { Event } from '../event.entity';
import { ArtistEventParamsDto } from './params';

export interface PatchArtistEventTimeParamsDto extends ArtistEventParamsDto {}

export interface PatchArtistEventTimeBodyDto {
	start_time: string;
	end_time: string | null;
}

export interface PatchArtistEventTimeResponseDto extends Event {}
