import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { RefreshControl, ScrollView, Text } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { ComplexEventStatus } from '@flux/api/event/types';
import { useEvent, useRefresh, withPoke } from '@hooks';
import { PageError } from '@templates';
import _ from 'lodash';
import React, { useMemo } from 'react';
import EmptyState from './EmptyState';
import LoadingView from './LoadingView';
import WorkbenchSection from './WorkbenchSection';
type SectionData = {
	id: ComplexEventStatus;
	title: string;
};
const sections: SectionData[] = [
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

interface WorkbenchViewProps {}

const WorkbenchView: React.FC<WorkbenchViewProps> = () => {
	const { artistData } = useArtistAppContext();
	let { data, isLoading, refetch, error } =
		artistEventApiSlice.useWorkbenchQuery({
			params: {
				artist_uid: artistData.artist_uid
			}
		});
	const refreshControl = useRefresh(refetch);

	const { _getComplexStatus } = useEvent();
	const getGroupedSections = () => {
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
		const groupedData = [];
		for (const section of sections) {
			const events = data?.filter(
				(event) => _getComplexStatus(event.event) === section.id
			);
			if (events?.length) {
				const sortedEvents = _.orderBy(
					events,
					[(event) => event.event.start_time || '9999-12-31'],
					['asc']
				);
				groupedData.push({ ...section, events: sortedEvents });
			}
		}
		return groupedData;
	};
	const groupedSections: GroupedSection[] = useMemo(getGroupedSections, [data]);
	withPoke({
		interval: 1,
		enabled: true,
		checkFn: getGroupedSections,
		name: 'Workbench'
	});

	if (error) {
		return <PageError error={error} />;
	}

	if (isLoading) {
		return <LoadingView />;
	}

	if (!data?.length) {
		return (
			<EmptyState
				title={
					<Text variant='paragraph-medium' color='text.q' textAlign='center'>
						Create an{' '}
						<Text variant='paragraph-medium' color='text.s'>
							event
						</Text>{' '}
						to get started
					</Text>
				}
				refetch={refetch}
			/>
		);
	}

	return (
		<ScrollView refreshControl={<RefreshControl {...refreshControl} />}>
			{groupedSections.map((section) => {
				if (!section.events?.length) return null;

				return (
					<WorkbenchSection
						key={section.id}
						sectionType={section.id}
						title={section.title}
						events={section.events}
					/>
				);
			})}
		</ScrollView>
	);
};

export default WorkbenchView;
