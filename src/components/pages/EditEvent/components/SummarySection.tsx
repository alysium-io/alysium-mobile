import { Section, View } from '@atomic';
import { useNavigation } from '@hooks';
import { Button, SectionHeader } from '@molecules';
import { MenuListItem, SummaryTextBlock } from '@organisms';
import { ApiIdentifier } from '@types';
import React from 'react';

interface SummarySectionProps {
	confirmDelete: () => void;
	event_uid: ApiIdentifier;
}

const SummarySection: React.FC<SummarySectionProps> = ({
	confirmDelete,
	event_uid
}) => {
	const { eventPage } = useNavigation();

	return (
		<Section marginVertical='m'>
			<View marginHorizontal='m'>
				<SectionHeader text='Summary' titleVariant='large' />
			</View>
			<View margin='m'>
				<SummaryTextBlock
					title='Event Details'
					items={[
						{ label: 'Number of Artists', value: '3' },
						{ label: 'Doors Open', value: '7:00pm' },
						{ label: 'Event Start', value: '8:00pm' },
						{ label: 'Event End', value: '2:00am' },
						{ label: 'Total Event Duration', value: '6 hrs' },
						{ label: 'Venue', value: '10080 N. Virginia Ave' }
					]}
				/>
			</View>
			<View>
				<MenuListItem
					title='Preview'
					onPress={() => eventPage(event_uid)}
					titleProps={{ color: 't2' }}
					border
				/>
				<MenuListItem
					title='Make Assets'
					onPress={() => console.log('Make Assets')}
					titleProps={{ color: 't2' }}
					border
				/>
				<MenuListItem
					title='Share'
					onPress={() => console.log('Share')}
					titleProps={{ color: 't2' }}
					border
				/>
				<View margin='m'>
					<Button
						variant='outlined'
						colorVariant='positive'
						text='Finalize'
						onPress={() => console.log('Finalize')}
					/>
				</View>
				<View margin='m'>
					<Button
						variant='outlined'
						colorVariant='negative'
						text='Delete'
						onPress={confirmDelete}
					/>
				</View>
			</View>
		</Section>
	);
};

export default SummarySection;
