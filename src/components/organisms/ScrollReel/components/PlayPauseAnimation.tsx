import { Icon, View } from '@atomic';
import { IconNames } from '@svg';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type CenterIconProps = React.ComponentProps<typeof View> & {
	icon: IconNames;
};

const CenterIcon: React.FC<CenterIconProps> = ({ icon, ...props }) => {
	return (
		<View
			animated
			justifyContent='center'
			alignItems='center'
			pointerEvents='none'
			{...props}
		>
			<View
				height={100}
				width={100}
				borderRadius='l'
				justifyContent='center'
				alignItems='center'
				style={{
					backgroundColor: 'rgba(0,0,0,0.3)'
				}}
				padding='xl'
			>
				<View height='100%' width='100%' opacity={0.9}>
					<Icon name={icon} size='expanded' color='palette.neutral.p1' />
				</View>
			</View>
		</View>
	);
};

interface PlayPauseAnimationProps {
	playAnimatedValue: SharedValue<number>;
	pauseAnimatedValue: SharedValue<number>;
}

const PlayPauseAnimation: React.FC<PlayPauseAnimationProps> = ({
	playAnimatedValue,
	pauseAnimatedValue
}) => {
	const playAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: playAnimatedValue.value
		};
	}, []);

	const pauseAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: pauseAnimatedValue.value
		};
	}, []);

	return (
		<>
			<CenterIcon
				icon='pause'
				style={[StyleSheet.absoluteFillObject, pauseAnimatedStyle]}
			/>
			<CenterIcon
				icon='play'
				style={[StyleSheet.absoluteFillObject, playAnimatedStyle]}
			/>
		</>
	);
};

export default PlayPauseAnimation;
