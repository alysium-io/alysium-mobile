import { BgTouchAnimation, Icon, View } from '@atomic';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Container from './components/Container';
import TitleText from './components/TitleText';

interface MenuListItemWithButtonProps {
	containerProps?: React.ComponentProps<typeof Container>;
	titleTextProps: React.ComponentProps<typeof TitleText>;
	disabled?: boolean;
	onPress?: () => void;
	onPressButton?: () => void;
	prefixIconProps?: React.ComponentProps<typeof Icon>;
	buttonIconProps: React.ComponentProps<typeof Icon>;
}

const MenuListItemWithButton: React.FC<MenuListItemWithButtonProps> = ({
	containerProps,
	titleTextProps,
	disabled = false,
	onPress,
	onPressButton,
	prefixIconProps,
	buttonIconProps
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
					<View padding='xl' paddingRight='m'>
						<Icon size='m' {...buttonIconProps} />
					</View>
				</TouchableOpacity>
			</Container>
		</BgTouchAnimation>
	);
};

export default MenuListItemWithButton;
