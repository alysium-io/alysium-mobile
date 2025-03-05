import { AView, View } from '@atomic';
import { useTheme } from '@hooks';
import { Props } from '@types';
import React, { useEffect } from 'react';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';
import { ButtonThemeSettings } from '../Button';

type ContainerProps = Omit<Props<typeof View>, 'animated'> & {
	settings: ButtonThemeSettings;
};

const Container: React.FC<ContainerProps> = ({ settings, ...props }) => {
	const { theme } = useTheme();
	const overrideBackgroundColor = props.backgroundColor
		? theme.colors[props.backgroundColor]
		: undefined;
	const backgroundColor = useSharedValue(
		theme.colors[settings.backgroundColor]
	);

	useEffect(() => {
		backgroundColor.value = withTiming(
			theme.colors[settings.backgroundColor] ?? 'bg.p',
			{
				duration: 150
			}
		);
	}, [theme, settings.backgroundColor]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: overrideBackgroundColor ?? backgroundColor.value
		};
	}, [theme, settings, props.backgroundColor]);

	return (
		<AView
			flexDirection='row'
			alignItems='center'
			justifyContent='center'
			borderRadius='round'
			padding='m'
			style={animatedStyle}
			{...props}
		/>
	);
};

export default Container;
