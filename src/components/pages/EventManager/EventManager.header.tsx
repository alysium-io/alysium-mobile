import { Text, View } from '@atomic';
import { Header, HeaderIconButton, HeaderSection } from '@organisms';
import React from 'react';
import { EventManagerView } from './EventManager.page';

interface EventManagerPageHeaderProps {
	eventsView: EventManagerView;
	onPressFilters: () => void;
}

const EventManagerPageHeader: React.FC<EventManagerPageHeaderProps> = ({
	eventsView,
	onPressFilters
}) => {
	return (
		<Header>
			<HeaderSection
				LeftComponent={
					<View>
						<Text>{eventsView}</Text>
					</View>
				}
				RightComponent={
					<HeaderIconButton name='filter' onPress={onPressFilters} />
				}
			/>
		</Header>
	);
};

export default EventManagerPageHeader;
