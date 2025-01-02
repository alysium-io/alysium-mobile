import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { AView, Icon, QRCode, Text, View } from '@atomic';
import { Vibrator } from '@etc';
import { artistEventApiSlice } from '@flux/api/event';
import {
	BottomSheetFooter,
	BottomSheetFooterProps,
	BottomSheetView
} from '@gorhom/bottom-sheet';
import {
	SheetApi,
	useClipboard,
	useDatetimeCountdown,
	useHyperlink,
	useIsLoaded,
	useQRCodeSize,
	useTheme
} from '@hooks';
import { ActionButtons, useButtonState } from '@molecules';
import { BottomSheet } from '@organisms';
import { IChildrenProps, NanoId } from '@types';
import LottieView from 'lottie-react-native';
import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NewEventCelebrationSheetProps extends IChildrenProps {
	sheetApi: SheetApi;
	event_uid: NanoId;
}

const NewEventCelebrationSheet: React.FC<NewEventCelebrationSheetProps> = ({
	sheetApi,
	event_uid
}) => {
	const { artistData } = useArtistAppContext();
	const { onLoad, isLoaded } = useIsLoaded();
	const { theme } = useTheme();
	const publishButtonState = useButtonState('active');
	const insets = useSafeAreaInsets();
	const qrCodeSizes = useQRCodeSize(0.3);
	const { eventPageHyperlink } = useHyperlink();
	const { copy } = useClipboard();

	const { data } = artistEventApiSlice.usePrivateFindOneArtistEventQuery({
		params: {
			event_uid,
			artist_uid: artistData.artist_uid
		}
	});

	const sheetDidOpen = () => {
		setTimeout(() => {
			Vibrator.notificationWarning();
		}, 300);
		onLoad();
	};

	const { countdown, clearInterval } = useDatetimeCountdown(
		data?.event.start_time ?? undefined,
		'D[d], H[h], m[m], s[s]'
	);

	const onAnimate = (_fromIndex: number, toIndex: number) => {
		// We get this glitchy behavior when trying to close the sheet
		// because of the "poking" that the countdown does. So this
		// is how we will cancel the interval before closing the sheet
		// so that it does not reopen the sheet.
		if (toIndex === -1) {
			clearInterval();
		}
	};

	const footerComponent = useCallback(
		(props: BottomSheetFooterProps) => (
			<BottomSheetFooter {...props}>
				<View
					flex={1}
					padding='m'
					paddingBottom='none'
					style={{ marginBottom: insets.bottom }}
					borderTopWidth={theme.borderWidth.normal}
					borderTopColor='border.light'
				>
					<ActionButtons
						buttonProps={[
							{
								text: 'Dismiss',
								onPress: sheetApi.close
							}
						]}
					/>
				</View>
			</BottomSheetFooter>
		),
		[publishButtonState.buttonState]
	);

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			footerComponent={footerComponent}
			handleComponent={null}
			sheetDidOpen={sheetDidOpen}
			onAnimate={onAnimate}
			backgroundColor={theme.colors['palette.neutral.p1']}
		>
			<BottomSheetView style={{ height: 500 }}>
				<View flex={1} justifyContent='center'>
					{isLoaded && (
						<AView entering={FadeInDown.duration(500)}>
							<Text variant='section-header-2' textAlign='center'>
								Event Published 🎉
							</Text>
							<Text
								variant='paragraph-small-medium'
								color='text.q'
								textAlign='center'
							>
								starts in {countdown}
							</Text>
						</AView>
					)}
					{isLoaded && (
						<AView
							entering={FadeInDown.duration(500).delay(300)}
							marginVertical='xl'
						>
							<Text variant='paragraph-small' color='text.s' textAlign='center'>
								Don't forget to share...
							</Text>
						</AView>
					)}
					<View>
						{isLoaded && (
							<AView
								entering={FadeInDown.duration(500).delay(400)}
								height={75}
								flexDirection='row'
								alignItems='center'
								marginBottom='s'
							>
								<View
									marginHorizontal='m'
									height={75}
									width={75}
									justifyContent='center'
									alignItems='center'
								>
									<Image
										source={require('src/assets/images/socials.png')}
										style={{
											height: '100%',
											width: '100%',
											objectFit: 'cover'
										}}
									/>
								</View>
								<View flex={1}>
									<Text variant='paragraph-small'>Via social media</Text>
									<Text variant='paragraph-small' color='text.q'>
										Press the menu bar in the top right to share via your
										instagram story, imessage, etc.
									</Text>
								</View>
							</AView>
						)}
						{isLoaded && (
							<AView
								entering={FadeInDown.duration(500).delay(500)}
								height={75}
								flexDirection='row'
								alignItems='center'
								marginBottom='s'
							>
								<View
									marginHorizontal='m'
									height={75}
									width={75}
									justifyContent='center'
									alignItems='center'
								>
									<QRCode
										{...qrCodeSizes}
										data={eventPageHyperlink(data?.event.event_uid ?? '')}
									/>
								</View>
								<View flex={1}>
									<Text variant='paragraph-small'>Via QR</Text>
									<Text variant='paragraph-small' color='text.q'>
										The QR Code on this page will take people to a webpage if
										they do not have the app.
									</Text>
								</View>
							</AView>
						)}
						{isLoaded && (
							<AView
								entering={FadeInDown.duration(500).delay(600)}
								height={75}
								flexDirection='row'
								alignItems='center'
								marginBottom='s'
							>
								<TouchableOpacity
									onPress={() =>
										copy(eventPageHyperlink(data?.event.event_uid ?? ''))
									}
								>
									<View
										marginHorizontal='m'
										padding='m'
										height={75}
										width={75}
										borderRadius='round'
										justifyContent='center'
										alignItems='center'
										backgroundColor='bg.light'
										borderWidth={theme.borderWidth.normal}
										borderColor='border.light'
									>
										<Icon name='chainlink' size='l' color='text.q' />
									</View>
								</TouchableOpacity>
								<View flex={1}>
									<Text variant='paragraph-small'>Copy Link</Text>
									<Text variant='paragraph-small' color='text.q'>
										← Press the icon to copy the link to your clipboard
									</Text>
								</View>
							</AView>
						)}
					</View>
				</View>
				<LottieView
					source={require('src/assets/lottie/confetti.lottie')}
					autoPlay
					loop={false}
					style={{
						width: '200%',
						position: 'absolute',
						height: 500,
						alignSelf: 'center',
						zIndex: -1
					}}
				/>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default NewEventCelebrationSheet;
