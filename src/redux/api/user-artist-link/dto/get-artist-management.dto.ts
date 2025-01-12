import { NanoId } from '@src/types/api';
import { UserArtistLink } from '../user-artist-link.entity';

export interface GetArtistTeamParamsDto {
	readonly artist_uid: NanoId;
}

export interface GetArtistTeamResponseDto extends Array<UserArtistLink> {}
