import { NanoId } from '@types';
import { ExternalUrl } from '../external-url.entity';

export interface DeleteExternalUrlParamsDto {
	readonly artist_uid: NanoId;
	readonly external_url_uid: NanoId;
}

export interface DeleteExternalUrlResponseDto extends ExternalUrl {}
