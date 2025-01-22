import { LiveIndicator, Section, Text, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { ComplexEventStatus } from '@flux/api/event/types';
import { useTheme } from '@hooks';
import React from 'react';
import { Case, Default, Switch } from 'react-if';
import EventListItem from './EventListItem';

interface WorkbenchSectionProps {
	events: EventLink[];
	title: string;
	sectionType: ComplexEventStatus;
}

const WorkbenchSection: React.FC<WorkbenchSectionProps> = ({
	title,
	sectionType,
	events
}) => {
	const { theme } = useTheme();
	return (
		<Section>
			<View
				margin='m'
				paddingBottom='m'
				borderBottomWidth={theme.borderWidth.normal}
				borderBottomColor='border.light'
			>
				<Switch>
					<Case condition={sectionType === ComplexEventStatus.live}>
						<View flexDirection='row' alignItems='center'>
							<LiveIndicator status={ComplexEventStatus.live} />
							<Text marginLeft='s' variant='paragraph' color='danger'>
								Live Now
							</Text>
						</View>
					</Case>
					<Default>
						<Text variant='paragraph' color='text.q'>
							{title}
						</Text>
					</Default>
				</Switch>
			</View>
			{events.map((event) => (
				<EventListItem key={event.event.event_uid} event={event} />
			))}
		</Section>
	);
};

export default WorkbenchSection;
