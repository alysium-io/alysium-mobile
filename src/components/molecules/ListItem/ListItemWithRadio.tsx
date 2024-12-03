import { BgTouchAnimation } from '@atomic';
import { Props } from '@types';
import React from 'react';
import Container from './components/Container';
import RadioButton from './components/RadioButton';
import TitleText from './components/TitleText';

interface ListItemWithRadioProps {
	id: string;
	containerProps?: Props<typeof Container>;
	radioButtonProps: Props<typeof RadioButton>;
	titleTextProps: Props<typeof TitleText>;
	disabled?: boolean;
	onPress?: () => void;
}

const ListItemWithRadio: React.FC<ListItemWithRadioProps> = ({
	containerProps,
	radioButtonProps,
	titleTextProps,
	disabled = false,
	onPress
}) => {
	return (
		<BgTouchAnimation disabled={disabled || !onPress} onPress={onPress}>
			<Container paddingVertical='xl' {...containerProps}>
				<TitleText {...titleTextProps} />
				<RadioButton {...radioButtonProps} />
			</Container>
		</BgTouchAnimation>
	);
};

export default ListItemWithRadio;
