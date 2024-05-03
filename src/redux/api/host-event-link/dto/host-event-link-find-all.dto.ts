import { HostEventLink } from '../host-event-link.entity';

export interface FindAllHostEventLinksQueryDto {
	page: number;
	limit: number;
}

export interface FindAllHostEventLinksResponseDto extends HostEventLink {}
