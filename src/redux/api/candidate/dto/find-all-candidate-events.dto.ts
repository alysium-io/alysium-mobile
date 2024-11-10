import { Pagination } from '@flux/api/utils/pagination';
import { NanoId } from '@types';
import { Candidate } from '../candidate.entity';

export interface FindAllCandidateEventsQueryDto extends Pagination {
	host_uid: NanoId;
	artist_uid: NanoId;
}

export interface FindAllCandidateEventsResponseDto extends Candidate {}
