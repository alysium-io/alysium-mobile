import { Icon, View } from '@atomic';
import { IconNames } from '@svg';
import React from 'react';

interface ButtonIconProps {
	icon?: IconNames;
	color: string;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, color }) => {
	if (!icon) {
		return null;
	}

	return (
		<View marginLeft='s'>
			<Icon name={icon} color={color} size='s' />
		</View>
	);
};

export default ButtonIcon;
