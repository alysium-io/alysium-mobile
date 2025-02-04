import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type ContainerProps = Props<typeof View> & {
	squareWidth: number;
};

const Container: React.FC<ContainerProps> = ({
	children,
	squareWidth,
	...props
}) => {
	return (
		<View
			height={squareWidth * 1.2}
			width={squareWidth}
			style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
			{...props}
		>
			{children}
		</View>
	);
};

export default Container;
