import { NanoId } from '@types';
import { ExternalUrl } from '../external-url.entity';
import { ExternalUrlRefType } from '../types';

export interface CreateExternalUrlBodyDto {
	readonly name: string;
	readonly url: string;
	readonly refType: ExternalUrlRefType;
	readonly refId: NanoId;
}

export interface CreateExternalUrlResponseDto extends ExternalUrl {}
