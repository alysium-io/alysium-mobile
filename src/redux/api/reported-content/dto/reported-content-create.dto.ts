import { NanoId } from '@types';
import { ReportedContentType } from '../types';

export interface CreateReportedContentBodyDto {
	description: string;
	reference_type: ReportedContentType;
	reference_uid: NanoId;
}

export interface CreateReportedContentResponseDto {}
