import { NanoId } from '@types';
import { Candidate } from '../candidate.entity';

export interface FindAllEventCandidatesQueryDto {
	event_uid: NanoId;
	page: number;
	limit: number;
}

export interface FindAllEventCandidatesResponseDto extends Candidate {}
