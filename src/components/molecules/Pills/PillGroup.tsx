import { View } from '@atomic';
import { IChildrenProps } from '@types';
import React from 'react';

interface PillGroupProps extends IChildrenProps {}

const PillGroup: React.FC<PillGroupProps> = ({ children }) => {
	return (
		<View flexDirection='row' flexWrap='wrap'>
			{children}
		</View>
	);
};

export default PillGroup;
