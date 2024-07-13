import { Checkbox, Radio, Text, View } from '@atomic';
import { useToggle } from '@hooks';
import { ChildrenProps } from '@types';
import React from 'react';

const Margin: React.FC<ChildrenProps> = ({ children }) => (
	<View margin='l'>{children}</View>
);

const Radios = () => {
	const { state, toggle } = useToggle();

	return (
		<View>
			<Text variant='section-header-2' margin='m'>
				Radio/Checkbox
			</Text>
			<View
				margin='m'
				flexDirection='row'
				justifyContent='space-between'
				flexWrap='wrap'
			>
				<Margin>
					<Radio active={state} onPress={toggle} color='radio.default' />
				</Margin>
				<Margin>
					<Radio active={state} onPress={toggle} color='radio.p' />
				</Margin>
				<Margin>
					<Checkbox checked={state} onPress={toggle} color='default' />
				</Margin>
				<Margin>
					<Checkbox checked={state} onPress={toggle} color='p' />
				</Margin>
			</View>
		</View>
	);
};

export default Radios;
