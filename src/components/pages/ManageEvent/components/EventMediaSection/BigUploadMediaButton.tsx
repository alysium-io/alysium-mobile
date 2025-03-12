import { Icon, LView, Text } from '@atomic';
import { useNavigation, useTheme } from '@hooks';
import { NanoId, Props } from '@types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
	FadeIn,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';

interface BigUploadMediaButtonProps extends Props<typeof TouchableOpacity> {
	isEmpty: boolean;
	event_uid: NanoId;
}

const BigUploadMediaButton: React.FC<BigUploadMediaButtonProps> = ({
	isEmpty,
	event_uid,
	...props
}) => {
	const { editEventMediaPage } = useNavigation();
	const { theme } = useTheme();
	const animatedValue = useSharedValue(1);

	const scaleIn = () => {
		animatedValue.value = withTiming(0, { duration: 200 });
	};

	const scaleOut = () => {
		animatedValue.value = withTiming(1, { duration: 200 });
	};

	const animatedContainerStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{ scale: interpolate(animatedValue.value, [0, 1], [0.99, 1]) }
			],
			shadowOpacity: interpolate(animatedValue.value, [0, 1], [0, 0.08])
		};
	}, []);

	return (
		<LView height={isEmpty ? 300 : 100} gap='m' flexDirection='row'>
			<TouchableOpacity
				style={{ flex: 1 }}
				activeOpacity={0.8}
				onPressIn={scaleIn}
				onPressOut={scaleOut}
				{...props}
			>
				<LView
					alignItems='center'
					justifyContent='center'
					gap='s'
					borderRadius='l'
					padding='xl'
					backgroundColor='bg.light'
					borderWidth={theme.borderWidth.normal}
					borderColor='border.light'
					style={[
						{
							borderRadius: 25,
							shadowColor: theme.colors['bg.negative.p'],
							shadowOffset: { width: 0, height: 0 },
							shadowRadius: 3.84,
							elevation: 5,
							height: '100%'
						},
						animatedContainerStyles
					]}
				>
					<Icon name='image' size='l' color='text.p' />
					<Text variant='paragraph-small-medium' color='text.p' marginTop='s'>
						Upload Media
					</Text>
				</LView>
			</TouchableOpacity>
			{!isEmpty && (
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => editEventMediaPage(event_uid)}
				>
					<LView
						entering={FadeIn.delay(250)}
						alignItems='center'
						justifyContent='center'
						gap='s'
						borderRadius='l'
						padding='xl'
						backgroundColor='bg.light'
						borderWidth={theme.borderWidth.normal}
						borderColor='border.light'
						style={[
							{
								aspectRatio: 1,
								borderRadius: 25,
								shadowColor: theme.colors['bg.negative.p'],
								shadowOffset: { width: 0, height: 0 },
								shadowRadius: 3.84,
								elevation: 5,
								height: '100%'
							}
						]}
					>
						<Icon name='filter' size='l' color='text.p' />
					</LView>
				</TouchableOpacity>
			)}
		</LView>
	);
};

export default BigUploadMediaButton;
