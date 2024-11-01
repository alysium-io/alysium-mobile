import { EventLink } from '@flux/api/event-link/event-link.entity';
import { ArtistEventParamsDto } from './params';

export interface DeleteArtistEventParamsDto extends ArtistEventParamsDto {}

export interface DeleteArtistEventResponseDto extends EventLink {}
