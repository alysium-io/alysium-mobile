import { View } from '@atomic';
import { useNavigation, useTheme } from '@hooks';
import { ActionButtons } from '@molecules';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Footer = () => {
	const { theme } = useTheme();
	const { back } = useNavigation();
	const insets = useSafeAreaInsets();
	return (
		<View
			backgroundColor='bg.light'
			borderTopWidth={theme.borderWidth.normal}
			borderTopColor='border.medium'
			width='100%'
			zIndex={999}
			position='absolute'
			bottom={0}
			padding='m'
			style={{
				paddingBottom: insets.bottom + theme.spacing.m
			}}
		>
			<ActionButtons
				buttonProps={{
					text: 'Dismiss',
					onPress: back,
					containerProps: {
						backgroundColor: 'bg.p'
					}
				}}
			/>
		</View>
	);
};

export default Footer;
