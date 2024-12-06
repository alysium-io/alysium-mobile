import { EventLink } from '@flux/api/event-link/event-link.entity';
import { EventStatus } from '../types';
import { ArtistEventParamsDto } from './params';

export interface UpdateArtistEventParamsDto extends ArtistEventParamsDto {}

export interface UpdateArtistEventBodyDto {
	readonly name: string;
	readonly about: string | null;
	readonly start_time: string | null;
	readonly end_time: string | null;
	readonly status: EventStatus;
}

export interface UpdateArtistEventResponseDto extends EventLink {}
