import { Icon, Text, View } from '@atomic';
import { ContentListItemWithButton } from '@organisms';
import { ContentType } from '@types';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';
import { useEventCandidatesPageContext } from '../EventCandidates.context';

interface StartContractButtonProps {
	onPress: () => void;
	text: string;
}

const StartContractButton: React.FC<StartContractButtonProps> = ({
	onPress,
	text
}) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View
				paddingVertical='s'
				paddingHorizontal='m'
				backgroundColor='bg1'
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					borderRadius: 999,
					borderWidth: 0.3,
					borderColor: 'black'
				}}
			>
				<Text paddingRight='s' variant='paragraph-small'>
					{text}
				</Text>
				<Icon name='arrow-right' size='small' />
			</View>
		</TouchableWithoutFeedback>
	);
};

const CandidatesSection = () => {
	const { candidatesData } = useEventCandidatesPageContext();
	return (
		<View
			animated
			entering={FadeInLeft.duration(200)}
			exiting={FadeOutLeft.duration(200)}
		>
			{candidatesData.map((candidate) => (
				<ContentListItemWithButton
					key={candidate.artist_id}
					title={candidate.artist.name}
					contentType={ContentType.artist}
					image={
						candidate.artist.profile_image?.url ||
						'https://via.placeholder.com/150'
					}
					onPress={() => console.log('hi')}
					Button={() => (
						<StartContractButton
							onPress={() => console.log('hi')}
							text='Start Contract'
						/>
					)}
				/>
			))}
		</View>
	);
};

export default CandidatesSection;
