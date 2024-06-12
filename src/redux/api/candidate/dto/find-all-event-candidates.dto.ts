import { ApiIdentifier } from '@types';
import { Candidate } from '../candidate.entity';

export interface FindAllEventCandidatesQueryDto {
	event_uid: ApiIdentifier;
	page: number;
	limit: number;
}

export interface FindAllEventCandidatesResponseDto extends Candidate {}
