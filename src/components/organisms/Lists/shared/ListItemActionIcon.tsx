import { Icon, View } from '@atomic';
import React from 'react';
import { Else, If, Then } from 'react-if';
import { TouchableWithoutFeedback } from 'react-native';

const ArrowIcon: React.FC = () => (
	<Icon name='arrow-right' color='ion' size='small' />
);

const MenuIcon: React.FC<{ onPress?: () => void }> = ({ onPress }) => (
	<TouchableWithoutFeedback onPress={onPress}>
		<View
			style={{
				height: '100%',
				flexDirection: 'row',
				alignItems: 'center',
				width: 20
			}}
			marginHorizontal='s'
		>
			<Icon name='meatballs' color='t2' />
		</View>
	</TouchableWithoutFeedback>
);

interface ListItemActionIconProps {
	actionIcon?: 'arrow' | 'menu';
	onPress?: () => void;
}

const ListItemActionIcon: React.FC<ListItemActionIconProps> = ({
	actionIcon = 'arrow',
	onPress
}) => {
	return (
		<If condition={actionIcon === 'arrow'}>
			<Then>
				<ArrowIcon />
			</Then>
			<Else>
				<MenuIcon onPress={onPress} />
			</Else>
		</If>
	);
};

export default ListItemActionIcon;
