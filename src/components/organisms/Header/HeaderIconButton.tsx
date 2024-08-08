import { Icon, View } from '@atomic';
import { IconNames } from '@svg';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

interface HeaderIconButtonProps {
	onPress: () => void;
	icon: IconNames;
	color?: string;
	iconProps?: React.ComponentProps<typeof Icon>;
}

const HeaderIconButton: React.FC<HeaderIconButtonProps> = ({
	onPress,
	icon,
	iconProps
}) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View>
				<Icon name={icon} size='m' color='text.s' {...iconProps} />
			</View>
		</TouchableWithoutFeedback>
	);
};

export default HeaderIconButton;
