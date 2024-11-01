import { EventLink } from '@flux/api/event-link/event-link.entity';
import { PrimitiveArtistEventParamsDto } from './params';

export interface FindAllArtistEventsParamsDto
	extends PrimitiveArtistEventParamsDto {}

export interface FindAllArtistEventsResponseDto extends Array<EventLink> {}
