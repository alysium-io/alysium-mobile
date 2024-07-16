import { Icon, View } from '@atomic';
import { useTheme } from '@hooks';
import { IconNames } from '@svg';
import { ThemeMode } from '@types';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

interface HeaderIconButtonProps {
	onPress: () => void;
	icon: IconNames;
	color?: string;
}

const HeaderIconButton: React.FC<HeaderIconButtonProps> = ({
	onPress,
	icon,
	color = 't2'
}) => {
	const { mode } = useTheme();

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View>
				<Icon
					name={icon}
					size='m'
					color={mode === ThemeMode.dark ? 't1' : color}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default HeaderIconButton;
