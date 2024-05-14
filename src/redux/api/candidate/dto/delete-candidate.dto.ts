import { ApiIdentifier } from '@types';
import { Candidate } from '../candidate.entity';

export interface DeleteCandidateBodyDto {
	event_id: ApiIdentifier;
	artist_id: ApiIdentifier;
}

export interface DeleteCandidateResponseDto extends Candidate {}
