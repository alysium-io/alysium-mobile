import { BgTouchAnimation, View } from '@atomic';
import { Colors } from '@etc';
import { useTheme } from '@hooks';
import React from 'react';

interface ListItemContainerProps {
	children: React.ReactNode;
	border?: boolean;
	onPress: () => void;
}

const ListItemContainer: React.FC<ListItemContainerProps> = ({
	children,
	border,
	onPress
}) => {
	const { getRawColor, theme } = useTheme();

	return (
		<BgTouchAnimation
			color={Colors.RGBA2String(Colors.hex2RGBA(getRawColor('ion'), 0.1))}
			animationType='highlight'
			onPress={onPress}
		>
			<View paddingHorizontal='m'>
				<View
					paddingVertical='s'
					flexDirection='row'
					alignItems='center'
					style={{
						borderBottomWidth: border ? 0.2 : 0,
						borderBottomColor: theme.colors.bg2
					}}
				>
					{children}
				</View>
			</View>
		</BgTouchAnimation>
	);
};

export default ListItemContainer;
