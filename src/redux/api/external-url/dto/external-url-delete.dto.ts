import { ApiIdentifier } from '@types';
import { ExternalUrl } from '../external-url.entity';
import { ExternalUrlRefType } from '../types';

export interface DeleteExternalUrlBodyDto {
	external_url_uid: ApiIdentifier;
	refType: ExternalUrlRefType;
}

export interface DeleteExternalUrlResponseDto extends ExternalUrl {}
