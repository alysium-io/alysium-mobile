import { ApiIdentifier } from '@types';
import { TagCorrelatedCommon } from '../tag-correlated.entity';

export interface FindTagCorrelatedParamsDto {
	tag_uid: ApiIdentifier;
}

export interface FindTagCorrelatedResponseDto
	extends Array<TagCorrelatedCommon> {}
