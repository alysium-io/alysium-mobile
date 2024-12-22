import { Section, Text, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { ComplexEventStatus } from '@flux/api/event/types';
import {
	useComplexEventStatuses,
	useEventDateFormatter,
	useNavigation,
	useTheme
} from '@hooks';
import { ContentListItem } from '@molecules';
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

	return (
		<ContentListItem
			onPress={() => manageEventPage(event.event.event_uid)}
			titleTextProps={{
				title: event.event.name,
				bottomSubtext: dateFormatter.timeAgoConcise() || ''
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
		{ id: ComplexEventStatus.archived, title: 'Recently Completed' },
		{ id: ComplexEventStatus.canceled, title: 'Canceled' }
	];

	// Group events by their complex status
	const eventsBySection = useMemo(() => {
		const grouped: Partial<Record<ComplexEventStatus, EventLink[]>> = {};

		events.forEach((event) => {
			const status = statusMap.get(event.event.event_uid);
			if (status) {
				grouped[status] = grouped[status] || [];
				grouped[status]!.push(event);
			}
		});

		return grouped;
	}, [events, statusMap]);

	if (!events?.length) {
		return null;
	}

	return (
		<View>
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
		</View>
	);
};

export default WorkbenchView;
