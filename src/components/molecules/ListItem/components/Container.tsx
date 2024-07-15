import { BgTouchAnimation, View } from '@atomic';
import { useTheme } from '@hooks';
import { IChildrenProps } from '@types';
import React from 'react';

interface ContainerProps extends IChildrenProps {
	id: string;
	onPress?: (id: string) => void;
	border?: boolean;
	disabled?: boolean;
}

const Container: React.FC<ContainerProps> = ({
	children,
	id,
	onPress,
	border = true,
	disabled = false
}) => {
	const { theme } = useTheme();
	return (
		<BgTouchAnimation
			disabled={disabled}
			onPress={() => onPress && onPress(id)}
		>
			<View
				paddingVertical='l'
				marginHorizontal='m'
				flexDirection='row'
				alignItems='center'
				justifyContent='space-between'
				borderBottomColor='border.light'
				borderBottomWidth={border ? theme.borderWidth.normal : 0}
			>
				{children}
			</View>
		</BgTouchAnimation>
	);
};

export default Container;
