import { Icon, View } from '@atomic';
import { IconNames } from '@svg';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BlockContainer from './components/BlockContainer';
import TitleText from './components/TitleText';

interface BlockListItemProps {
	icon?: IconNames;
	onPress?: () => void;
	titleTextProps: React.ComponentProps<typeof TitleText>;
}

const BlockListItem: React.FC<BlockListItemProps> = ({
	icon,
	onPress = () => console.log('BlockListItem pressed'),
	titleTextProps
}) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<BlockContainer>
				{icon && (
					<View marginRight='m'>
						<Icon name={icon} color='block-list-item.icon' size='l' />
					</View>
				)}
				<TitleText
					{...titleTextProps}
					titleColor='block-list-item.title'
					titleVariant='paragraph'
					bottomSubtextColor='block-list-item.subtitle'
					topSubtextColor='block-list-item.subtitle'
				/>
				<Icon name='arrow-right' color='block-list-item.icon' size='s' />
			</BlockContainer>
		</TouchableWithoutFeedback>
	);
};

export default BlockListItem;
