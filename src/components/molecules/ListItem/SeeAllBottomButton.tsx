import { BgTouchAnimation, Text } from '@atomic';
import { Props } from '@types';
import React from 'react';
import Container from './components/Container';

type SeeAllBottomButtonProps = {
	containerProps?: Props<typeof Container>;
	onPress?: () => void;
};

const SeeAllBottomButton: React.FC<SeeAllBottomButtonProps> = ({
	containerProps,
	onPress
}) => {
	return (
		<BgTouchAnimation onPress={onPress}>
			<Container
				{...containerProps}
				justifyContent='center'
				borderBottomColor='transparent'
			>
				<Text textAlign='center' textDecorationLine='underline'>
					See All
				</Text>
			</Container>
		</BgTouchAnimation>
	);
};

export default SeeAllBottomButton;
