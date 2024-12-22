import { EventLink } from '@flux/api/event-link/event-link.entity';
import { ArtistEventParamsDto } from './params';

export interface UpdateArtistEventParamsDto extends ArtistEventParamsDto {}

export interface UpdateArtistEventBodyDto {
	readonly name?: string;
	readonly about?: string | null;
}

export interface UpdateArtistEventResponseDto extends EventLink {}
