import { BgTouchAnimation } from '@atomic';
import React from 'react';
import Container from './components/Container';
import RadioButton from './components/RadioButton';
import TitleText from './components/TitleText';

interface ListItemWithRadioProps {
	id: string;
	containerProps?: React.ComponentProps<typeof Container>;
	radioButtonProps: React.ComponentProps<typeof RadioButton>;
	titleTextProps: React.ComponentProps<typeof TitleText>;
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
			<Container {...containerProps}>
				<TitleText {...titleTextProps} />
				<RadioButton {...radioButtonProps} />
			</Container>
		</BgTouchAnimation>
	);
};

export default ListItemWithRadio;