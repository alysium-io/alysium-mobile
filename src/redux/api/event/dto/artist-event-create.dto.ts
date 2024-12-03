import { EventLink } from '@flux/api/event-link/event-link.entity';
import { PrimitiveArtistEventParamsDto } from './params';

export interface CreateArtistEventParamsDto
	extends PrimitiveArtistEventParamsDto {}

export interface CreateArtistEventBodyDto {
	name: string;
}

export interface CreateArtistEventResponseDto extends EventLink {}
