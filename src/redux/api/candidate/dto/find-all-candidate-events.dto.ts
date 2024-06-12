import { ApiIdentifier } from '@types';
import { Candidate } from '../candidate.entity';

export interface FindAllCandidateEventsQueryDto {
	host_uid: ApiIdentifier;
	artist_uid: ApiIdentifier;
	page: number;
	limit: number;
}

export interface FindAllCandidateEventsResponseDto extends Candidate {}
