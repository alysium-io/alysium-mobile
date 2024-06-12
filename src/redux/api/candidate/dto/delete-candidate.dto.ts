import { ApiIdentifier } from '@types';
import { Candidate } from '../candidate.entity';

export interface DeleteCandidateBodyDto {
	event_uid: ApiIdentifier;
	artist_uid: ApiIdentifier;
}

export interface DeleteCandidateResponseDto extends Candidate {}
