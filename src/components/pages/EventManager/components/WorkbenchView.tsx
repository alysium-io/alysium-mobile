import { ScrollView, Section, Text, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { ComplexEventStatus } from '@flux/api/event/types';
import {
	useComplexEventStatuses,
	useDatetimeCountdown,
	useEventDateFormatter,
	useNavigation,
	useTheme
} from '@hooks';
import { ContentListItem } from '@molecules';
import { orderBy } from 'lodash';
import React, { useMemo } from 'react';

interface WorkbenchViewProps {
	events?: EventLink[];
}

const EventListItem: React.FC<{ event: EventLink }> = ({ event }) => {
	const { manageEventPage } = useNavigation();
	const dateFormatter = useEventDateFormatter(
		event.event.start_time,
		event.event.end_time
	);

	const { countdown } = useDatetimeCountdown(
		event.event.start_time ?? undefined
	);

	const getSubtext = () => {
		if (!dateFormatter.hasValidDate) return 'No date';

		// If the event is today, show the countdown
		if (dateFormatter.isToday) {
			if (countdown) return 'Today, ' + countdown;
			return 'Live';
		}

		if (dateFormatter.isInFuture)
			return dateFormatter.semantic() + ', ' + dateFormatter.startDate();
		if (dateFormatter.isInPast) return dateFormatter.timeAgoConcise();
		return 'No date';
	};

	return (
		<ContentListItem
			onPress={() => manageEventPage(event.event.event_uid)}
			titleTextProps={{
				title: event.event.name,
				bottomSubtext: getSubtext() || undefined
			}}
			profileImageProps={{
				image: event.event.profile_image?.small.key,
				borderRadius: 'none',
				defaultImageProps: {
					icon: 'event'
				}
			}}
		/>
	);
};

const WorkbenchView: React.FC<WorkbenchViewProps> = ({ events = [] }) => {
	const { theme } = useTheme();
	const { statusMap } = useComplexEventStatuses(events?.map((e) => e.event));

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

		events.forEach((event) => {
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
	}, [events, statusMap]);

	if (!events?.length) {
		return (
			<View flex={1} justifyContent='center' alignItems='center'>
				<Text variant='paragraph-medium' color='text.q' textAlign='center'>
					Create an{' '}
					<Text variant='paragraph-medium' color='text.s'>
						event
					</Text>{' '}
					to get started
				</Text>
			</View>
		);
	}

	return (
		<ScrollView>
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
