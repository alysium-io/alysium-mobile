import { Icon, View } from '@atomic';
import { Button } from '@molecules';
import React, { useEffect } from 'react';
import {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming
} from 'react-native-reanimated';

interface CompleteModalProps {
	dismiss: () => void;
	CompleteModalContent?: () => React.JSX.Element;
}

const CompleteModal: React.FC<CompleteModalProps> = ({
	dismiss,
	CompleteModalContent
}) => {
	const animatedTranslateY = useSharedValue<number>(-500);

	const animatedContainerStyle = useAnimatedStyle(() => {
		return { transform: [{ translateY: animatedTranslateY.value }] };
	}, []);

	useEffect(() => {
		animatedTranslateY.value = withSpring(0, {
			damping: 20,
			stiffness: 100
		});
	}, []);

	const onPress = () => {
		animatedTranslateY.value = withTiming(-1000, {
			duration: 400
		});
		setTimeout(dismiss, 450);
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center'
			}}
		>
			<View
				animated
				margin='m'
				style={[
					{
						backgroundColor: '#fff',
						borderRadius: 25
					},
					animatedContainerStyle
				]}
			>
				<View
					margin='xl'
					marginBottom='m'
					flexDirection='row'
					justifyContent='center'
				>
					<Icon name='logo' color='t2' />
				</View>
				{CompleteModalContent && <CompleteModalContent />}
				<View margin='m'>
					<Button
						text='done'
						onPress={onPress}
						buttonColorConfig={{
							background: 'black',
							text: 'white'
						}}
					/>
				</View>
			</View>
		</View>
	);
};

export default CompleteModal;
