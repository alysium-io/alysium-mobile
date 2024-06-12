import { ApiIdentifier } from '@types';
import { Candidate } from '../candidate.entity';

export interface CreateCandidateBodyDto {
	event_uid: ApiIdentifier;
	artist_uid: ApiIdentifier;
}

export interface CreateCandidateResponseDto extends Candidate {}
