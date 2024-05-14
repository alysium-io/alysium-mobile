import { Text, View } from '@atomic';
import { useTheme } from '@hooks';
import { ThemeMode } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';

interface BottomSheetHeaderProps {
	text: string;
}

const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = ({ text }) => {
	const { getRawColor, mode } = useTheme();

	return (
		<View
			style={[
				styles.container,
				{
					borderBottomWidth: 0.5,
					borderBottomColor:
						mode === ThemeMode.dark ? getRawColor('bg3') : getRawColor('bg2')
				}
			]}
			paddingBottom='l'
			marginTop='s'
			paddingHorizontal='m'
		>
			<Text variant='section-header-1'>{text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-start'
	}
});

export default BottomSheetHeader;
