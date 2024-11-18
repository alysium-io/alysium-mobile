import { Icon, View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

type HeaderIconButtonProps = Props<typeof Icon> & {
	onPress?: () => void;
};

const HeaderIconButton: React.FC<HeaderIconButtonProps> = ({
	onPress,
	name = 'artist',
	color = 'text.s',
	size = 'm',
	...props
}) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View padding='s'>
				<Icon name={name} size={size} color={color} {...props} />
			</View>
		</TouchableWithoutFeedback>
	);
};

export default HeaderIconButton;
