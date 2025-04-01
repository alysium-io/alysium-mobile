import { Icon, View } from '@atomic';
import { useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';

interface CustomShareButtonIconProps extends Props<typeof Icon> {}

const CustomShareButtonIcon: React.FC<CustomShareButtonIconProps> = ({
	...props
}) => {
	const { theme } = useTheme();
	return (
		<View
			height='100%'
			width='100%'
			backgroundColor='bg.light'
			borderRadius='round'
			justifyContent='center'
			alignItems='center'
			borderWidth={theme.borderWidth.normal}
			borderColor='border.light'
		>
			<Icon size='l' color='text.p' {...props} />
		</View>
	);
};

export default CustomShareButtonIcon;
