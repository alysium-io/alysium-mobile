import { Event } from '../event.entity';
import { EventStatus } from '../types';
import { ArtistEventParamsDto } from './params';

export interface PatchArtistEventStatusParamsDto extends ArtistEventParamsDto {}

export interface PatchArtistEventStatusBodyDto {
	status: EventStatus;
}

export interface PatchArtistEventStatusResponseDto extends Event {}
