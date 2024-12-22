import { NanoId } from '@types';
import { ExternalUrl } from '../external-url.entity';

export interface CreateExternalUrlParamsDto {
	readonly artist_uid: NanoId;
}

export interface CreateExternalUrlBodyDto {
	readonly name: string;
	readonly url: string;
}

export interface CreateExternalUrlResponseDto extends ExternalUrl {}
