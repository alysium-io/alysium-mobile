import React from 'react';
import Container from './components/Container';
import RadioButton from './components/RadioButton';
import TitleText from './components/TitleText';

interface ListItemWithRadioProps {
	id: string;
	containerProps?: Omit<React.ComponentProps<typeof Container>, 'id'>;
	radioButtonProps: React.ComponentProps<typeof RadioButton>;
	titleTextProps: React.ComponentProps<typeof TitleText>;
}

const ListItemWithRadio: React.FC<ListItemWithRadioProps> = ({
	id,
	containerProps,
	radioButtonProps,
	titleTextProps
}) => {
	return (
		<Container id={id} {...containerProps}>
			<TitleText {...titleTextProps} />
			<RadioButton {...radioButtonProps} />
		</Container>
	);
};

export default ListItemWithRadio;
