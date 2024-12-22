import { EventLink } from '@flux/api/event-link/event-link.entity';
import { PrimitiveArtistEventParamsDto } from './params';

export interface ArchiveParamsDto extends PrimitiveArtistEventParamsDto {}

export interface ArchiveResponseDto extends Array<EventLink> {}
