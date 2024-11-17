import { BgTouchAnimation, Icon, Text, View } from '@atomic';
import { useTheme } from '@hooks';
import { IconNames } from '@svg';
import React from 'react';

interface BottomSheetListItemProps {
	text: string;
	icon?: IconNames;
	textProps?: React.ComponentProps<typeof Text>;
	iconProps?: Partial<React.ComponentProps<typeof Icon>>;
	onPress: () => void;
}

const BottomSheetListItem: React.FC<BottomSheetListItemProps> = ({
	text,
	onPress,
	icon,
	textProps,
	iconProps
}) => {
	const { theme } = useTheme();

	return (
		<BgTouchAnimation onPress={onPress}>
			<View
				borderColor='border.light'
				borderBottomWidth={theme.borderWidth.normal}
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
				padding='m'
			>
				<Text variant='paragraph-bold' {...textProps}>
					{text}
				</Text>
				{icon && <Icon name={icon} size='m' color='text.p' {...iconProps} />}
			</View>
		</BgTouchAnimation>
	);
};

export default BottomSheetListItem;
