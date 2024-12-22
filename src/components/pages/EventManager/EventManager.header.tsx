import { Text, View } from '@atomic';
import { Header, HeaderIconButton, HeaderSection } from '@organisms';
import { capitalize } from 'lodash';
import React from 'react';

interface EventManagerPageHeaderProps {
	eventsView: string;
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
						<Text>{capitalize(eventsView)}</Text>
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
