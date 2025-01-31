import { ActivityIndicator, BlurView } from '@atomic';
import { useTheme } from '@hooks';
import { ThemeMode } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';

const TotalEventsLoading = () => {
	const { themeMode } = useTheme();
	return (
		<BlurView
			style={[
				StyleSheet.absoluteFill,
				{
					justifyContent: 'center',
					alignItems: 'center'
				}
			]}
			pointerEvents='box-none'
			blurAmount={5}
			blurType={themeMode === ThemeMode.dark ? 'light' : 'dark'}
		>
			<ActivityIndicator
				size='small'
				color={themeMode === ThemeMode.dark ? 'black' : 'white'}
			/>
		</BlurView>
	);
};

export default TotalEventsLoading;
