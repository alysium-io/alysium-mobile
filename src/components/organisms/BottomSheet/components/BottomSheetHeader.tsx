import { Text, View } from '@atomic';
import { useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';

type BottomSheetHeaderProps = Props<typeof Text> & {
	containerProps?: Props<typeof View>;
};

const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = ({
	containerProps,
	...props
}) => {
	const { theme } = useTheme();
	return (
		<View
			flexDirection='row'
			justifyContent='flex-start'
			borderBottomWidth={theme.borderWidth.thin}
			borderColor='border.light'
			paddingBottom='l'
			marginTop='s'
			paddingHorizontal='m'
			{...containerProps}
		>
			<Text variant='section-header-1' {...props} />
		</View>
	);
};

export default BottomSheetHeader;
