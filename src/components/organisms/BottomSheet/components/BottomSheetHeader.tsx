import { Text, View } from '@atomic';
import { useTheme } from '@hooks';
import React from 'react';

interface BottomSheetHeaderProps {
	text: string;
}

const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = ({ text }) => {
	const { theme } = useTheme();

	return (
		<View
			flexDirection='row'
			justifyContent='flex-start'
			borderBottomWidth={theme.borderWidth.thin}
			borderBottomColor='border.light'
			paddingBottom='l'
			marginTop='s'
			paddingHorizontal='m'
		>
			<Text variant='section-header-1'>{text}</Text>
		</View>
	);
};

export default BottomSheetHeader;
