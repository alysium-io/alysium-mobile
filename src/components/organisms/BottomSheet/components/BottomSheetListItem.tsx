import { Icon, Text, View } from '@atomic';
import { useTheme } from '@hooks';
import { IconNames } from '@svg';
import { ThemeMode } from '@types';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface BottomSheetListItemProps {
	text: string;
	icon?: IconNames;
	onPress: () => void;
	border?: boolean;
}

const BottomSheetListItem: React.FC<BottomSheetListItemProps> = ({
	text,
	onPress,
	icon,
	border = true
}) => {
	const { theme, mode, getRawColor } = useTheme();

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View
				style={[
					styles.container,
					border && {
						borderBottomWidth: 0.3,
						borderBottomColor:
							mode === ThemeMode.dark ? getRawColor('bg3') : getRawColor('ion')
					}
				]}
				padding='m'
			>
				<Text variant='paragraph-small-bold'>{text}</Text>
				{icon && <Icon name={icon} size='s' color={theme.colors.t1} />}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
});

export default BottomSheetListItem;
