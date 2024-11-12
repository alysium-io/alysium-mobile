import { EventLink } from '@flux/api/event-link/event-link.entity';
import { Pagination } from '@flux/api/utils/pagination';
import { PrimitiveArtistEventParamsDto } from './params';

export interface FindAllArtistEventsParamsDto
	extends PrimitiveArtistEventParamsDto {}

export interface FindAllArtistEventsQueryDto extends Pagination {}

export interface FindAllArtistEventsResponseDto extends Array<EventLink> {}
