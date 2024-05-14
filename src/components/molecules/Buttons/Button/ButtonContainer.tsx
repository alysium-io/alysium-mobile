import { View } from '@atomic';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ButtonContainerProps {
	children?: React.ReactNode;
	onPress?: () => void;
	borderColor: string;
	backgroundColor: string;
	isDisabled?: boolean;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({
	children,
	onPress,
	borderColor,
	backgroundColor,
	isDisabled = false
}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={isDisabled}
			activeOpacity={0.9}
		>
			<View
				padding='m'
				style={[
					styles.container,
					{
						borderColor,
						backgroundColor
					}
				]}
			>
				{children}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 100,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 0.3
	}
});

export default ButtonContainer;
