import { EventLink } from '@flux/api/event-link/event-link.entity';
import { ArtistEventParamsDto } from './params';

export interface UpdateArtistEventParamsDto extends ArtistEventParamsDto {}

export interface UpdateArtistEventBodyDto {
	readonly name: string;
	readonly start_time: string | null;
	readonly end_time: string | null;
}

export interface UpdateArtistEventResponseDto extends EventLink {}
