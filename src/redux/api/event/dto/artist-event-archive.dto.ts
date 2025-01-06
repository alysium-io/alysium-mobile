import { EventLink } from '@flux/api/event-link/event-link.entity';
import { Pagination } from '@flux/api/utils/pagination';
import { PrimitiveArtistEventParamsDto } from './params';

export interface ArchiveParamsDto extends PrimitiveArtistEventParamsDto {}

export interface ArchiveQueryDto extends Pagination {}

export interface ArchiveResponseDto extends Array<EventLink> {}
