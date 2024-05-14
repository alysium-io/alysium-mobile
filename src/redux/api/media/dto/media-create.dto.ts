import { ApiIdentifier } from '@types';
import { Media, MediaRefType } from '../media.entity';

export interface CreateMediaBodyDto {
	ref: MediaRefType;
	refId: ApiIdentifier;
	field: string;
}

export interface CreateMediaResponseDto extends Media {}
