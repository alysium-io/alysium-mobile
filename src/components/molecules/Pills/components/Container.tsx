import { View } from '@atomic';
import { useTheme } from '@hooks';
import { ChildrenProps, Props } from '@types';
import React from 'react';

type ContainerProps = ChildrenProps & Props<typeof View> & {};

const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
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
			marginRight='s'
			marginBottom='s'
			borderColor='border.medium'
			{...props}
		>
			{children}
		</View>
	);
};

export default Container;
