import { NanoId } from '@types';
import { Candidate } from '../candidate.entity';

export interface DeleteCandidateBodyDto {
	event_uid: NanoId;
	artist_uid: NanoId;
}

export interface DeleteCandidateResponseDto extends Candidate {}
