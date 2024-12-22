import { NanoId } from '@types';
import { ExternalUrl } from '../external-url.entity';

export interface UpdateExternalUrlParamsDto {
	readonly artist_uid: NanoId;
	readonly external_url_uid: NanoId;
}

export interface UpdateExternalUrlBodyDto {
	readonly name: string;
	readonly url: string;
}

export interface UpdateExternalUrlResponseDto extends ExternalUrl {}
