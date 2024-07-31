import { Text } from '@atomic';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Container from './components/Container';

interface PillProps {
	text: string;
	onPress?: () => void;
	containerProps?: React.ComponentProps<typeof Container>;
}

const Pill: React.FC<PillProps> = ({ text, onPress, containerProps }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<Container {...containerProps}>
				<Text variant='paragraph-small' color='text.s'>
					{text}
				</Text>
			</Container>
		</TouchableWithoutFeedback>
	);
};

export default Pill;
