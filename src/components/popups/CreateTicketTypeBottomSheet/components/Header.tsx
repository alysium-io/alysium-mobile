import { Icon, Text, View } from '@atomic';
import { SequenceApi } from '@organisms';
import React, { useEffect } from 'react';
import {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring
} from 'react-native-reanimated';

interface HeaderProps {
	sequenceApi: SequenceApi;
	title: string;
}

const Header: React.FC<HeaderProps> = ({ sequenceApi, title }) => {
	useEffect(() => {
		animatedValue.value = withSpring(sequenceApi.sequenceIndex, {
			duration: 300,
			stiffness: 1
		});
	}, [sequenceApi.sequenceIndex]);

	const animatedValue = useSharedValue(0);

	const animatedContainerStyle = useAnimatedStyle(() => {
		const { numItems } = sequenceApi;
		return {
			transform: [
				{
					rotate: `${interpolate(
						animatedValue.value,
						[0, numItems - 1],
						[90, 0]
					)}deg`
				}
			]
		};
	}, []);

	return (
		<View margin='m' marginTop='xl' alignItems='center'>
			<Text
				variant='section-header-2'
				color={title === 'New Ticket' ? 't3' : 't2'}
			>
				{title}
			</Text>
			<View animated style={animatedContainerStyle} marginTop='m'>
				<Icon name='ticket' color='ion_dark' size='xlarge' />
			</View>
		</View>
	);
};

export default Header;
