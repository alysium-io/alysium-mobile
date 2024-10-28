import { Icon, Text, View } from '@atomic';
import { useNavigation } from '@hooks';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ControlsOverlay = () => {
	const insets = useSafeAreaInsets();
	const { back } = useNavigation();

	return (
		<View
			style={{
				position: 'absolute',
				paddingTop: insets.top
			}}
		>
			<View
				padding='m'
				width='100%'
				flexDirection='row'
				alignItems='center'
				justifyContent='space-between'
			>
				<TouchableWithoutFeedback onPress={back}>
					<Icon name='arrow-left' size='m' color='palette.neutral.p1' />
				</TouchableWithoutFeedback>
				<Text variant='paragraph-large-bold' color='palette.neutral.p1'>
					Content
				</Text>
				<Icon name='arrow-left' size='m' color='transparent' />
			</View>
		</View>
	);
};

export default ControlsOverlay;
