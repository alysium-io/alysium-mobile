import { ApiIdentifier } from '@types';
import { Candidate } from '../candidate.entity';

export interface FindAllCandidateEventsQueryDto {
	host_id: ApiIdentifier;
	artist_id: ApiIdentifier;
	page: number;
	limit: number;
}

export interface FindAllCandidateEventsResponseDto extends Candidate {}
