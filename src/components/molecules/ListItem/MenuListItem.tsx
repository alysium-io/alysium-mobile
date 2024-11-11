import { BgTouchAnimation, Icon, View } from '@atomic';
import { IconNames } from '@svg';
import React from 'react';
import Container from './components/Container';
import TitleText from './components/TitleText';

interface MenuListItemProps {
	containerProps?: React.ComponentProps<typeof Container>;
	titleTextProps: React.ComponentProps<typeof TitleText>;
	disabled?: boolean;
	onPress?: () => void;
	icon?: IconNames;
	prefixIconProps?: React.ComponentProps<typeof Icon>;
}

const MenuListItem: React.FC<MenuListItemProps> = ({
	containerProps,
	titleTextProps,
	disabled = false,
	onPress,
	icon = 'arrow-right',
	prefixIconProps
}) => {
	return (
		<BgTouchAnimation disabled={disabled} onPress={onPress}>
			<Container {...containerProps}>
				{prefixIconProps && (
					<View marginRight='m' marginLeft='s'>
						<Icon size='s' {...prefixIconProps} />
					</View>
				)}
				<TitleText {...titleTextProps} />
				<View marginHorizontal='m'>
					<Icon name={icon} color='text.t' size='s' />
				</View>
			</Container>
		</BgTouchAnimation>
	);
};

export default MenuListItem;
