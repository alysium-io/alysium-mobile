import { BlurView, Icon, Text, View } from '@atomic';
import { useTheme } from '@hooks';
import { Handle } from '@organisms';
import { IconNames } from '@svg';
import { ThemeMode } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';
import RNToast, { ToastConfigParams } from 'react-native-toast-message';

type CustomToastProps = ToastConfigParams<{
	icon?: IconNames;
}>;

const CustomToast: React.FC<CustomToastProps> = ({ props, ...toastProps }) => {
	const { themeMode } = useTheme();

	return (
		<View style={styles.container}>
			<Shadow
				style={{ width: '100%' }}
				paintInside={false}
				distance={4}
				startColor={themeMode === ThemeMode.dark ? '#FFFFFF15' : '#00000015'}
				endColor={themeMode === ThemeMode.dark ? '#FFFFFF00' : '#00000000'}
			>
				<BlurView
					style={{ borderRadius: 18 }}
					blurAmount={20}
					blurType={themeMode === ThemeMode.dark ? 'dark' : 'xlight'}
				>
					<View
						marginHorizontal='xs'
						padding='m'
						paddingBottom='xs'
						flexDirection='row'
						alignItems='center'
					>
						{props.icon && (
							<View marginRight='s'>
								<Icon name={props.icon} size='m' color='text.t' />
							</View>
						)}
						<View justifyContent='center' flex={1}>
							{toastProps.text1 && (
								<Text
									variant='paragraph-medium'
									color='text.p'
									marginBottom='xs'
									numberOfLines={1}
									ellipsizeMode='tail'
									adjustsFontSizeToFit
									minimumFontScale={0.5}
									flex={1}
								>
									{toastProps.text1}
								</Text>
							)}
							{toastProps.text2 && (
								<Text
									variant='paragraph-small'
									color='text.t'
									numberOfLines={1}
									ellipsizeMode='tail'
									adjustsFontSizeToFit
									minimumFontScale={0.5}
									flex={1}
								>
									{toastProps.text2}
								</Text>
							)}
						</View>
					</View>
					<Handle />
				</BlurView>
			</Shadow>
		</View>
	);
};

const Toast = () => {
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();

	const toastConfig = {
		success: CustomToast,
		error: CustomToast,
		info: CustomToast
	};

	return (
		<RNToast config={toastConfig} topOffset={insets.top + theme.spacing.m} />
	);
};

const styles = StyleSheet.create({
	container: {
		width: '95%',
		justifyContent: 'center',
		borderRadius: 18,
		padding: 8,
		zIndex: 999999999
	}
});

export default Toast;
