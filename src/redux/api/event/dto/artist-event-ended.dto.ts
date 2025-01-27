import { EventLink } from '@flux/api/event-link/event-link.entity';
import { Pagination } from '@flux/api/utils/pagination';
import { PrimitiveArtistEventParamsDto } from './params';

export interface EndedParamsDto extends PrimitiveArtistEventParamsDto {}

export interface EndedQueryDto extends Pagination {}

export interface EndedResponseDto extends Array<EventLink> {}
