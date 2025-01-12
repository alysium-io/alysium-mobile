import { ScrollView, Text, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useEventDateFormatter, useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import { orderBy } from 'lodash';
import React from 'react';

interface ArchiveViewProps {
	events?: EventLink[];
}

const ArchiveView: React.FC<ArchiveViewProps> = ({ events }) => {
	const { manageEventPage } = useNavigation();
	const sortedEvents = orderBy(events, ['event.start_time'], ['desc']);

	if (!events?.length) {
		return (
			<View flex={1} justifyContent='center' alignItems='center'>
				<Text variant='paragraph-medium' color='text.q' textAlign='center'>
					When you complete an{' '}
					<Text variant='paragraph-medium' color='text.s'>
						event
					</Text>
					{'\n'}
					it will appear here
				</Text>
			</View>
		);
	}

	return (
		<ScrollView>
			{sortedEvents?.map((event) => {
				const dateFormatter = useEventDateFormatter(
					event.event.start_time,
					event.event.end_time
				);
				return (
					<ContentListItem
						key={event.event.event_uid}
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
			})}
		</ScrollView>
	);
};

export default ArchiveView;
