import { ApiIdentifier } from '@types';
import { Candidate } from '../candidate.entity';

export interface CreateCandidateBodyDto {
	event_id: ApiIdentifier;
	artist_id: ApiIdentifier;
}

export interface CreateCandidateResponseDto extends Candidate {}
