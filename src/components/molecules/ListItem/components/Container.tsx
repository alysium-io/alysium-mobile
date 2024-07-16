import { View } from '@atomic';
import { useTheme } from '@hooks';
import { ChildrenProps } from '@types';
import React from 'react';

type ContainerProps = ChildrenProps &
	React.ComponentProps<typeof View> & {
		border?: boolean;
	};

const Container: React.FC<ContainerProps> = ({
	children,
	border = true,
	...props
}) => {
	const { theme } = useTheme();
	return (
		<View
			paddingVertical='l'
			marginHorizontal='m'
			flexDirection='row'
			alignItems='center'
			justifyContent='space-between'
			borderBottomColor='border.light'
			borderBottomWidth={border ? theme.borderWidth.normal : 0}
			{...props}
		>
			{children}
		</View>
	);
};

export default Container;
