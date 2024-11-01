import { EventLink } from '@flux/api/event-link/event-link.entity';
import { ArtistEventParamsDto } from './params';

export interface FindOneArtistEventParamsDto extends ArtistEventParamsDto {}

export interface FindOneArtistEventResponseDto extends EventLink {}
