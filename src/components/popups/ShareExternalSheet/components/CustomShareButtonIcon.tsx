import { Icon, View } from '@atomic';
import { useTheme } from '@hooks';
import { IconNames } from '@svg';
import React from 'react';

interface CustomShareButtonIconProps {
	icon: IconNames;
}

const CustomShareButtonIcon: React.FC<CustomShareButtonIconProps> = ({
	icon
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
			<Icon name={icon} size='l' color='border.heavy' />
		</View>
	);
};

export default CustomShareButtonIcon;
