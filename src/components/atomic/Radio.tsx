import { Icon, View } from '@atomic';
import { useTheme } from '@hooks';
import { FeatureColors, ThemeMode } from '@types';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface RadioProps {
	checked: boolean;
	onPress: () => void;
	colorVariant?: 'default' | keyof FeatureColors;
}

const Radio: React.FC<RadioProps> = ({
	checked,
	onPress,
	colorVariant = 'default'
}) => {
	const { mode, getRawColor, theme } = useTheme();

	const colorScheme = useMemo(() => {
		if (mode === ThemeMode.dark) {
			return { color: colorVariant === 'default' ? 'white' : colorVariant };
		} else {
			return { color: colorVariant === 'default' ? 'black' : colorVariant };
		}
	}, [mode, colorVariant]);

	const _onPress = () => {
		onPress();
	};

	return (
		<TouchableWithoutFeedback onPress={_onPress}>
			<View flexDirection='row'>
				<View
					animated
					style={[
						styles.container,
						{
							borderColor: getRawColor(colorScheme.color),
							backgroundColor: checked
								? theme.colors[colorScheme.color]
								: 'transparent'
						}
					]}
				>
					<View
						animated
						style={[
							{
								height: 16,
								width: 16,
								opacity: checked ? 1 : 0
							}
						]}
					>
						<Icon name='checkmark' size='expanded' color='white' />
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 3,
		padding: 4
	}
});

export default Radio;
