import { BlurView, Overlay, Text, View } from '@atomic';
import { useDisclosure } from '@hooks';
import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';

interface AlertButton {
	text: string;
	onPress?: () => void;
	style?: 'default' | 'cancel' | 'destructive' | 'accent';
}

interface AlertOptions {
	title: string;
	message?: string;
	buttons?: AlertButton[];
}

interface AlertContextType {
	alert: (title: string, message?: string, buttons?: AlertButton[]) => void;
}

const COLORS = {
	destructive: '#FF6B6B', // Softer red
	accent: '#4A9EFF', // Softer blue
	text: '#FFFFFF' // White for default text
};

const AlertContext = createContext<AlertContextType>({} as AlertContextType);

let alertFunction:
	| ((title: string, message?: string, buttons?: AlertButton[]) => void)
	| null = null;

const AlertButton: React.FC<{
	button: AlertButton;
	onPress: () => void;
	hasBorder?: boolean;
}> = ({ button, onPress, hasBorder }) => {
	const opacity = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value
	}));

	const getTextColor = () => {
		switch (button.style) {
			case 'destructive':
				return COLORS.destructive;
			case 'cancel':
			case 'default':
				return COLORS.text;
			case 'accent':
			default:
				return COLORS.accent;
		}
	};

	const handlePressIn = () => {
		opacity.value = withTiming(0.6, { duration: 100 });
	};

	const handlePressOut = () => {
		opacity.value = withTiming(1, { duration: 100 });
	};

	return (
		<Pressable
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			style={[styles.button, hasBorder && styles.buttonBorder]}
		>
			<Animated.View style={[styles.buttonContent, animatedStyle]}>
				<Text
					style={[
						styles.buttonText,
						{ color: getTextColor() },
						button.style === 'cancel' && styles.cancelText
					]}
				>
					{button.text}
				</Text>
			</Animated.View>
		</Pressable>
	);
};

const AlertService: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [alertConfig, setAlertConfig] = React.useState<AlertOptions | null>(
		null
	);

	const showAlert = useCallback(
		(title: string, message?: string, buttons: AlertButton[] = []) => {
			setAlertConfig({ title, message, buttons });
			onOpen();
		},
		[onOpen]
	);

	alertFunction = showAlert;

	const handleButtonPress = (button: AlertButton) => {
		onClose();
		button.onPress?.();
	};

	const value = useMemo(() => ({ alert: showAlert }), [showAlert]);

	return (
		<AlertContext.Provider value={value}>
			{children}
			<Overlay visible={isOpen} useContentBlurView>
				<BlurView style={styles.alertContainer}>
					<View margin='m' paddingBottom='m' justifyContent='center'>
						<Text style={styles.title} color='text.p'>
							{alertConfig?.title}
						</Text>
						{alertConfig?.message && (
							<Text style={styles.message} color='text.q'>
								{alertConfig.message}
							</Text>
						)}
					</View>
					<View style={styles.buttonContainer}>
						{alertConfig?.buttons?.map((button, index) => (
							<AlertButton
								key={index}
								button={button}
								onPress={() => handleButtonPress(button)}
								hasBorder={index > 0}
							/>
						))}
					</View>
				</BlurView>
			</Overlay>
		</AlertContext.Provider>
	);
};

const styles = StyleSheet.create({
	alertContainer: {
		borderRadius: 16,
		width: '80%',
		maxWidth: 270
	},
	title: {
		fontSize: 17,
		fontWeight: '600',
		textAlign: 'center',
		color: COLORS.text,
		marginBottom: 8
	},
	message: {
		fontSize: 13,
		textAlign: 'center',
		color: 'rgba(255,255,255,0.8)'
	},
	buttonContainer: {
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: 'rgba(255,255,255,0.2)'
	},
	button: {
		paddingVertical: 20
	},
	buttonContent: {
		width: '100%'
	},
	buttonBorder: {
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: 'rgba(255,255,255,0.2)'
	},
	buttonText: {
		fontSize: 17,
		textAlign: 'center'
	},
	cancelText: {}
});

export const Alert = {
	alert: (title: string, message?: string, buttons?: AlertButton[]) => {
		if (alertFunction) {
			alertFunction(title, message, buttons);
		}
	},
	error: (
		message: string = 'An unexpected error occurred',
		buttons?: AlertButton[]
	) => {
		if (alertFunction) {
			alertFunction(
				'Error',
				message,
				buttons || [{ text: 'Dismiss', style: 'cancel' }]
			);
		}
	}
};

export const useAlert = () => useContext(AlertContext);
export { AlertService as AlertProvider };
