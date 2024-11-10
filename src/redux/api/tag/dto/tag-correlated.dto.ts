import { NanoId } from '@types';
import { TagCorrelatedCommon } from '../tag-correlated.entity';

export interface FindTagCorrelatedParamsDto {
	tag_uid: NanoId;
}

export interface FindTagCorrelatedResponseDto
	extends Array<TagCorrelatedCommon> {}
