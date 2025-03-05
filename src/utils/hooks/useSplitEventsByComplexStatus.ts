import { EventLink } from '@flux/api/event-link/event-link.entity';
import { ComplexEventStatus } from '@flux/api/event/types';
import { orderBy } from 'lodash';
import { useMemo } from 'react';
import useEvent from './useEvent';

type SectionData = {
	id: ComplexEventStatus;
	title: string;
};

const SECTIONS: SectionData[] = [
	{ id: ComplexEventStatus.live, title: 'Live Now' },
	{ id: ComplexEventStatus.coming_up, title: 'Coming Up' },
	{ id: ComplexEventStatus.draft, title: 'Drafts' },
	{ id: ComplexEventStatus.completed, title: 'Recently Completed' },
	{ id: ComplexEventStatus.canceled, title: 'Canceled' },
	{ id: ComplexEventStatus.ended, title: 'Ended' }
];

type GroupedSection = SectionData & {
	events: EventLink[];
};

interface IUseSplitEventsByComplexStatus
	extends Record<ComplexEventStatus, EventLink[]> {
	sections: GroupedSection[];
	getSections: () => GroupedSection[];
}

const useSplitEventsByComplexStatus = (
	data?: EventLink[]
): IUseSplitEventsByComplexStatus => {
	const { _getComplexStatus } = useEvent();

	const getSections = () => {
		/**
		 * Sample returned data structure;
		 * groupedData = [
		 * 	{
		 * 		id: ComplexEventStatus.live,
		 * 		title: 'Live Now',
		 * 		events: EventLink[]
		 * 	},
		 * 	...
		 * ]
		 */
		if (!data?.length) return [];
		const groupedData = [] as GroupedSection[];

		for (const section of SECTIONS) {
			const events = data?.filter(
				(event) => _getComplexStatus(event.event) === section.id
			);
			if (events?.length) {
				const sortedEvents = orderBy(
					events,
					[(event) => event.event.start_time || '9999-12-31'],
					['asc']
				);
				groupedData.push({ ...section, events: sortedEvents });
			}
		}
		return groupedData;
	};

	const sections = useMemo(getSections, [data]);

	return {
		getSections,
		sections,
		[ComplexEventStatus.live]:
			sections.find((section) => section.id === ComplexEventStatus.live)
				?.events || [],
		[ComplexEventStatus.coming_up]:
			sections.find((section) => section.id === ComplexEventStatus.coming_up)
				?.events || [],
		[ComplexEventStatus.draft]:
			sections.find((section) => section.id === ComplexEventStatus.draft)
				?.events || [],
		[ComplexEventStatus.completed]:
			sections.find((section) => section.id === ComplexEventStatus.completed)
				?.events || [],
		[ComplexEventStatus.canceled]:
			sections.find((section) => section.id === ComplexEventStatus.canceled)
				?.events || [],
		[ComplexEventStatus.ended]:
			sections.find((section) => section.id === ComplexEventStatus.ended)
				?.events || []
	};
};

export default useSplitEventsByComplexStatus;
