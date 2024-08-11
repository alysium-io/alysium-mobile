import { Pagination } from '@flux/api/utils/pagination';
import { HostEventLink } from '../host-event-link.entity';

export interface FindAllHostEventLinksQueryDto extends Pagination {}

export interface FindAllHostEventLinksResponseDto extends HostEventLink {}
