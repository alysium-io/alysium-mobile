import { BlurView, LinearGradient, Text, View } from '@atomic';
import { useTheme } from '@hooks';
import { Handle } from '@organisms';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RNToast, { BaseToastProps } from 'react-native-toast-message';

type CustomToastProps = BaseToastProps & {
	color: string;
};

const CustomToast = (props: CustomToastProps) => {
	return (
		<View style={styles.container} marginHorizontal='m'>
			<LinearGradient
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%'
				}}
				colors={[props.color, 'transparent']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			/>
			<BlurView style={StyleSheet.absoluteFillObject} blurAmount={15} />
			<View marginHorizontal='xs' padding='m' paddingBottom='s'>
				<Text variant='paragraph-medium' color='text.p' marginBottom='xs'>
					{props.text1}
				</Text>
				<Text variant='paragraph-small' color='text.q'>
					{props.text2}
				</Text>
			</View>
			<Handle />
		</View>
	);
};

const Toast = () => {
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();

	const toastConfig = {
		success: (props: BaseToastProps) => (
			<CustomToast {...props} color={theme.colors['success']} />
		),
		error: (props: BaseToastProps) => (
			<CustomToast {...props} color={theme.colors['danger']} />
		),
		info: (props: BaseToastProps) => (
			<CustomToast {...props} color={theme.colors['transparent']} />
		)
	};

	return (
		<RNToast config={toastConfig} topOffset={insets.top + theme.spacing.m} />
	);
};

const styles = StyleSheet.create({
	container: {
		width: '95%',
		overflow: 'hidden',
		justifyContent: 'center',
		borderRadius: 18,
		backgroundColor: 'rgba(0, 0, 0, 0.1)'
	}
});

export default Toast;
