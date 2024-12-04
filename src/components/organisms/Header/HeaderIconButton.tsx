import { Icon, View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import { TouchableOpacity } from 'react-native';

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
		<TouchableOpacity activeOpacity={0.5} onPress={onPress}>
			<View padding='s'>
				<Icon name={name} size={size} color={color} {...props} />
			</View>
		</TouchableOpacity>
	);
};

export default HeaderIconButton;
