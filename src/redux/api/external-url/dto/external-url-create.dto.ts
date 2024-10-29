import { ApiIdentifier } from '@types';
import { ExternalUrl } from '../external-url.entity';
import { ExternalUrlRefType } from '../types';

export interface CreateExternalUrlBodyDto {
	readonly name: string;
	readonly url: string;
	readonly refType: ExternalUrlRefType;
	readonly refId: ApiIdentifier;
}

export interface CreateExternalUrlResponseDto extends ExternalUrl {}
