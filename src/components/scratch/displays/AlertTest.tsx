import { View } from '@atomic';
import { Button } from '@molecules';
import { Alert, AlertProvider } from '@templates';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OverlayTest = () => {
	const insets = useSafeAreaInsets();
	const onPress = () => {
		Alert.alert(
			'Discard changes?',
			'If you go back now, you will lose your changes.',
			[
				{ text: 'Keep editing', style: 'default' },
				{ text: 'Keep editing', style: 'accent' },
				{
					text: 'Discard changes',
					style: 'destructive',
					onPress: () => console.log('hi')
				}
			]
		);
	};

	return (
		<View style={{ marginTop: insets.top }} flex={1}>
			<View margin='m'>
				<Button text='Open Overlay' onPress={onPress} />
			</View>
		</View>
	);
};

export default () => (
	<AlertProvider>
		<OverlayTest />
	</AlertProvider>
);
