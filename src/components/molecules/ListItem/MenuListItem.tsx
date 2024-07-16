import { BgTouchAnimation, Icon, View } from '@atomic';
import React from 'react';
import Container from './components/Container';
import TitleText from './components/TitleText';

interface MenuListItemProps {
	containerProps?: React.ComponentProps<typeof Container>;
	titleTextProps: React.ComponentProps<typeof TitleText>;
	disabled?: boolean;
	onPress?: () => void;
}

const MenuListItem: React.FC<MenuListItemProps> = ({
	containerProps,
	titleTextProps,
	disabled = false,
	onPress
}) => {
	return (
		<BgTouchAnimation disabled={disabled} onPress={onPress}>
			<Container {...containerProps}>
				<TitleText {...titleTextProps} />
				<View marginHorizontal='m'>
					<Icon name='arrow-right' color='text.t' size='s' />
				</View>
			</Container>
		</BgTouchAnimation>
	);
};

export default MenuListItem;
