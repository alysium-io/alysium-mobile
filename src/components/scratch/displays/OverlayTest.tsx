import { BlurView, Overlay, View } from '@atomic';
import { useDisclosure } from '@hooks';
import { Button } from '@molecules';
import React from 'react';
import LoaderKit from 'react-native-loader-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OverlayTest = () => {
	const insets = useSafeAreaInsets();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<View style={{ marginTop: insets.top }} flex={1}>
			<View margin='m'>
				<Button text='Open Overlay' onPress={onOpen} />
			</View>
			<Overlay visible={isOpen} onClose={onClose}>
				<BlurView
					style={{
						padding: 25,
						borderRadius: 15
					}}
				>
					<LoaderKit
						style={{ width: 50, height: 50 }}
						name='BallClipRotateMultiple'
						color='white'
					/>
				</BlurView>
			</Overlay>
		</View>
	);
};

export default OverlayTest;
