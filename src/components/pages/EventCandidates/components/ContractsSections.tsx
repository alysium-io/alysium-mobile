import { View } from '@atomic';
import { ContentListItemWithStatus } from '@organisms';
import { ContentType } from '@types';
import React from 'react';
import { FadeInRight, FadeOutRight } from 'react-native-reanimated';
import { useEventCandidatesPageContext } from '../EventCandidates.context';

const ContractsSection = () => {
	const { candidatesData } = useEventCandidatesPageContext();
	return (
		<View
			animated
			entering={FadeInRight.duration(200)}
			exiting={FadeOutRight.duration(200)}
		>
			{candidatesData.map((candidate) => (
				<ContentListItemWithStatus
					key={candidate.artist_id}
					title={candidate.artist.name}
					subtitle={'Something else'}
					contentType={ContentType.artist}
					image={
						candidate.artist.profile_image?.url ||
						'https://via.placeholder.com/150'
					}
					onPress={() => console.log('hi')}
					statusText={'Waiting'}
					statusColor='t2'
					statusBarVariant='filled'
				/>
			))}
		</View>
	);
};

export default ContractsSection;
