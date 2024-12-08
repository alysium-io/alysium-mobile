import { BgTouchAnimation, Icon, View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Container from './components/Container';
import TitleText from './components/TitleText';

interface MenuListItemWithButtonProps {
	containerProps?: Props<typeof Container>;
	titleTextProps: Props<typeof TitleText>;
	disabled?: boolean;
	onPress?: () => void;
	onPressButton?: () => void;
	prefixIconProps?: Props<typeof Icon>;
	buttonIconProps: Props<typeof Icon>;
	buttonIconContainerProps?: Props<typeof View>;
}

const MenuListItemWithButton: React.FC<MenuListItemWithButtonProps> = ({
	containerProps,
	titleTextProps,
	disabled = false,
	onPress,
	onPressButton,
	prefixIconProps,
	buttonIconProps,
	buttonIconContainerProps
}) => {
	return (
		<BgTouchAnimation disabled={disabled} onPress={onPress}>
			<Container {...containerProps} paddingVertical='s'>
				{prefixIconProps && (
					<View marginRight='m' marginLeft='s'>
						<Icon size='s' {...prefixIconProps} />
					</View>
				)}
				<TitleText {...titleTextProps} />
				<TouchableOpacity onPress={onPressButton}>
					<View padding='xl' paddingRight='m' {...buttonIconContainerProps}>
						<Icon size='m' {...buttonIconProps} />
					</View>
				</TouchableOpacity>
			</Container>
		</BgTouchAnimation>
	);
};

export default MenuListItemWithButton;
