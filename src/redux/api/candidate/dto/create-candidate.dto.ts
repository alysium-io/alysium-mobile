import { NanoId } from '@types';
import { Candidate } from '../candidate.entity';

export interface CreateCandidateBodyDto {
	event_uid: NanoId;
	artist_uid: NanoId;
}

export interface CreateCandidateResponseDto extends Candidate {}
