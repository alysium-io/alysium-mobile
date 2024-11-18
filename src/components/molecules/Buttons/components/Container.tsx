import { View } from '@atomic';
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
	const backgroundColor = useSharedValue<string>(
		theme.colors[settings.backgroundColor]
	);

	useEffect(() => {
		backgroundColor.value = withTiming(theme.colors[settings.backgroundColor], {
			duration: 150
		});
	}, [theme, settings.backgroundColor]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: backgroundColor.value
		};
	}, [theme, settings]);

	return (
		<View
			animated
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
