import { Icon, Touchable } from '@atomic';
import { useNavigation, useTheme } from '@hooks';
import React from 'react';

const BackButton = () => {
	const { back } = useNavigation();
	const { theme } = useTheme();

	return (
		<Touchable onPress={back}>
			<Icon
				name='arrow'
				direction='left'
				size='regular'
				color={theme.colors.t1}
			/>
		</Touchable>
	);
};

export default BackButton;
