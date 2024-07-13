import { Icon, View } from '@atomic';
import { SemanticColor } from '@types';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface CheckboxProps {
	checked: boolean;
	onPress?: () => void;
	color?: 'default' | 'p';
}

const Checkbox: React.FC<CheckboxProps> = ({
	checked,
	onPress,
	color = 'default'
}) => {
	const bgColor = `checkbox.bg.${color}` as SemanticColor;
	const iconColor = `checkbox.icon.${color}` as SemanticColor;
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View flexDirection='row'>
				<View
					animated
					borderColor={bgColor}
					backgroundColor={checked ? bgColor : 'transparent'}
					borderRadius='m'
					style={styles.container}
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
						<Icon name='checkmark' size='expanded' color={iconColor} />
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 2.5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 4
	}
});

export default Checkbox;
