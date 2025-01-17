import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { RefreshControl, ScrollView, Section, Text, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { ComplexEventStatus } from '@flux/api/event/types';
import { useComplexEventStatuses, useRefresh, useTheme } from '@hooks';
import { orderBy } from 'lodash';
import React, { useMemo } from 'react';
import EventListItem from './EventListItem';
import LoadingView from './LoadingView';
import WorkbenchEmptyState from './WorkbenchEmptyState';

interface WorkbenchViewProps {}

const WorkbenchView: React.FC<WorkbenchViewProps> = () => {
	const { artistData } = useArtistAppContext();
	const { data, isLoading, refetch } = artistEventApiSlice.useWorkbenchQuery({
		params: {
			artist_uid: artistData.artist_uid
		}
	});
	const refreshControl = useRefresh(refetch);

	const { theme } = useTheme();
	const { statusMap } = useComplexEventStatuses(data?.map((e) => e.event));

	const sections = [
		{ id: ComplexEventStatus.live, title: 'Live Now' },
		{ id: ComplexEventStatus.coming_up, title: 'Coming Up' },
		{ id: ComplexEventStatus.draft, title: 'Drafts' },
		{ id: ComplexEventStatus.archived, title: 'Recently Completed' },
		{ id: ComplexEventStatus.canceled, title: 'Canceled' }
	];

	// Group events by their complex status and sort by start_time
	const eventsBySection = useMemo(() => {
		const grouped: Partial<Record<ComplexEventStatus, EventLink[]>> = {};

		data?.forEach((event) => {
			const status = statusMap.get(event.event.event_uid);
			if (status) {
				grouped[status] = grouped[status] || [];
				grouped[status]!.push(event);
			}
		});

		// Sort events within each section
		Object.keys(grouped).forEach((status) => {
			grouped[status as ComplexEventStatus] = orderBy(
				grouped[status as ComplexEventStatus],
				[(event) => event.event.start_time || '9999-12-31'], // Push nulls to end
				['asc']
			);
		});

		return grouped;
	}, [data, statusMap]);

	if (isLoading) {
		return <LoadingView />;
	}

	if (!data?.length) {
		return <WorkbenchEmptyState />;
	}

	return (
		<ScrollView refreshControl={<RefreshControl {...refreshControl} />}>
			{sections.map((section) => {
				const sectionEvents = eventsBySection[section.id];
				if (!sectionEvents?.length) return null;

				return (
					<Section key={section.id}>
						<View
							margin='m'
							borderBottomWidth={theme.borderWidth.normal}
							borderBottomColor='border.light'
						>
							<Text variant='paragraph' marginBottom='m' color='text.q'>
								{section.title}
							</Text>
						</View>
						{sectionEvents.map((event) => (
							<EventListItem key={event.event.event_uid} event={event} />
						))}
					</Section>
				);
			})}
		</ScrollView>
	);
};

export default WorkbenchView;
