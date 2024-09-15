import { Pagination } from '@flux/api/utils/pagination';
import { Tag } from '../tag.entity';

export interface TopTagsQueryDto extends Pagination {}

export interface TopTagsResponseDto extends Array<Tag> {}
