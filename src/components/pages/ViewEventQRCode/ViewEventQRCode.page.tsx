import { BlurView, QRCode, Toast, View } from '@atomic';
import {
	useClipboard,
	useHyperlink,
	useNavigation,
	useShareViewShot,
	useTheme
} from '@hooks';
import { Button, CircularButton } from '@molecules';
import { useRoute } from '@react-navigation/native';
import { ViewEventQRCodePageRouteProp } from '@types';
import React from 'react';
import Animated from 'react-native-reanimated';
import ViewShot from 'react-native-view-shot';

const ViewEventQRCodePage = () => {
	const { back } = useNavigation();
	const { eventPageHyperlink } = useHyperlink();
	const { theme } = useTheme();
	const { params } = useRoute<ViewEventQRCodePageRouteProp>();
	const { copy } = useClipboard();
	const { captureWithOptions, viewShotRef, shareVia } = useShareViewShot(
		eventPageHyperlink(params.event_uid)
	);
	return (
		<BlurView style={{ flex: 1 }}>
			<View flex={1} justifyContent='center' alignItems='center'>
				<Animated.View
					style={{
						borderRadius: 35,
						backgroundColor: theme.colors['palette.neutral.p1'],
						shadowColor: theme.colors['bg.negative.p'],
						padding: theme.spacing['m'],
						shadowOffset: { width: 0, height: 0 },
						shadowOpacity: 0.25,
						shadowRadius: 3.84
					}}
					sharedTransitionTag={`manage-event-qr-code-${params.event_uid}`}
				>
					<ViewShot ref={viewShotRef}>
						<QRCode
							data={eventPageHyperlink(params.event_uid)}
							size={5}
							color={theme.colors['palette.neutral.p9']}
						/>
					</ViewShot>
				</Animated.View>
				<View marginTop='m'>
					<View
						flexDirection='row'
						alignItems='center'
						justifyContent='space-between'
						gap='xl'
						margin='m'
					>
						<CircularButton
							title='Save Image'
							iconProps={{
								name: 'save',
								color: 'text.q'
							}}
							onPress={captureWithOptions}
						/>
						<CircularButton
							title='Copy Link'
							iconProps={{
								name: 'chainlink',
								color: 'text.q'
							}}
							onPress={() =>
								copy(eventPageHyperlink(params.event_uid), {
									text1: 'Link Copied to Clipboard',
									text2: eventPageHyperlink(params.event_uid),
									props: { icon: 'link' }
								})
							}
						/>
						<CircularButton
							title='Share Via'
							iconProps={{
								name: 'share-external',
								color: 'text.q'
							}}
							onPress={shareVia}
						/>
					</View>
					<Button
						containerProps={{ margin: 'm' }}
						text='back'
						onPress={back}
						beforeIconProps={{
							name: 'arrow-left'
						}}
						buttonThemeSettings={{
							backgroundColor: 'bg.t',
							textColor: 'text.s'
						}}
					/>
				</View>
			</View>
			<Toast />
		</BlurView>
	);
};

export default ViewEventQRCodePage;
