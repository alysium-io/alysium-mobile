import { View } from '@atomic';
import { useTheme } from '@hooks';
import { IChildrenProps } from '@types';
import React from 'react';

interface ContainerProps extends IChildrenProps {}

const Container: React.FC<ContainerProps> = ({ children }) => {
	const { theme } = useTheme();
	return (
		<View
			borderRadius='round'
			flexDirection='row'
			alignItems='center'
			justifyContent='center'
			paddingHorizontal='m'
			paddingVertical='s'
			borderWidth={theme.borderWidth.normal}
			borderColor='border.medium'
			marginRight='s'
			marginBottom='s'
		>
			{children}
		</View>
	);
};

export default Container;
