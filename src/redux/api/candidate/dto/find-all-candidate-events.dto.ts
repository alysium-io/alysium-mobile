import { Pagination } from '@flux/api/utils/pagination';
import { ApiIdentifier } from '@types';
import { Candidate } from '../candidate.entity';

export interface FindAllCandidateEventsQueryDto extends Pagination {
	host_uid: ApiIdentifier;
	artist_uid: ApiIdentifier;
}

export interface FindAllCandidateEventsResponseDto extends Candidate {}
