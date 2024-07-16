import { View } from '@atomic';
import { IChildrenProps } from '@types';
import React from 'react';

interface BlockContainerProps extends IChildrenProps {}

const BlockContainer: React.FC<BlockContainerProps> = ({ children }) => {
	return (
		<View
			backgroundColor='block-list-item.bg'
			padding='m'
			marginBottom='l'
			flexDirection='row'
			alignItems='center'
			borderRadius='l'
		>
			{children}
		</View>
	);
};

export default BlockContainer;
