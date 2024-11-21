import { BgTouchAnimation, Icon, View } from '@atomic';
import { IconNames } from '@svg';
import { Props } from '@types';
import React from 'react';
import Container from './components/Container';
import TitleText from './components/TitleText';

interface MenuListItemProps {
	containerProps?: Props<typeof Container>;
	titleTextProps: Props<typeof TitleText>;
	disabled?: boolean;
	onPress?: () => void;
	icon?: IconNames;
	iconProps?: Partial<Props<typeof Icon>>;
	prefixIconProps?: Props<typeof Icon>;
}

const MenuListItem: React.FC<MenuListItemProps> = ({
	containerProps,
	titleTextProps,
	disabled = false,
	onPress,
	icon = 'arrow-right',
	iconProps,
	prefixIconProps
}) => {
	return (
		<BgTouchAnimation disabled={disabled} onPress={onPress}>
			<Container paddingVertical='xl' {...containerProps}>
				{prefixIconProps && (
					<View marginRight='m' marginLeft='s'>
						<Icon size='s' {...prefixIconProps} />
					</View>
				)}
				<TitleText {...titleTextProps} />
				<View marginHorizontal='m'>
					<Icon name={icon} color='text.t' size='s' {...iconProps} />
				</View>
			</Container>
		</BgTouchAnimation>
	);
};

export default MenuListItem;
