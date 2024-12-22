import { EventLink } from '@flux/api/event-link/event-link.entity';
import { PrimitiveArtistEventParamsDto } from './params';

export interface WorkbenchParamsDto extends PrimitiveArtistEventParamsDto {}

export interface WorkbenchResponseDto extends Array<EventLink> {}
