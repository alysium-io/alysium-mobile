import { EventLink } from '@flux/api/event-link/event-link.entity';
import { ApiIdentifier } from '@types';
import { PrimitiveArtistEventParamsDto } from './params';

export interface CreateArtistEventParamsDto
	extends PrimitiveArtistEventParamsDto {}

export interface CreateArtistEventBodyDto {
	host_uid: ApiIdentifier;
	name: string;
}

export interface CreateArtistEventResponseDto extends EventLink {}
