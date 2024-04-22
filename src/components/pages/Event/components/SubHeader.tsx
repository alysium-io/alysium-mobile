import { Section, Text, View } from '@atomic';
import day from 'dayjs';
import React from 'react';
import { useEventPageContext } from '../Event.context';

const SubHeader = () => {
	const { eventData } = useEventPageContext();

	return (
		<Section
			margin='m'
			flexDirection='row'
			alignItems='center'
			justifyContent='space-between'
		>
			<View flex={1}>
				<Text
					variant='paragraph-large-medium'
					style={{ marginBottom: 6 }}
					numberOfLines={1}
					ellipsizeMode='tail'
				>
					{day(eventData.start_time).format('ddd. MMM D')}
				</Text>
				<Text variant='paragraph-medium' color='t2'>
					{day(eventData.start_time).format('HH:mm A')}
				</Text>
			</View>
			<View flex={1}>
				<Text
					variant='paragraph-medium'
					style={{ marginBottom: 6 }}
					textAlign='right'
				>
					Amsterdam, NE
				</Text>
				<Text variant='paragraph-medium' textAlign='right'>
					10083 N. Condor Street
				</Text>
			</View>
		</Section>
	);
};

export default SubHeader;
