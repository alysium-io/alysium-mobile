import { EventLink } from '@flux/api/event-link/event-link.entity';
import { Pagination } from '@flux/api/utils/pagination';
import { PrimitiveArtistEventParamsDto } from './params';

export interface AllParamsDto extends PrimitiveArtistEventParamsDto {}

export interface AllQueryDto extends Pagination {}

export interface AllResponseDto extends Array<EventLink> {}
