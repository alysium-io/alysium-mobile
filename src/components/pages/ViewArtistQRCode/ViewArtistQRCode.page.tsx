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
import { ViewArtistQRCodePageRouteProp } from '@types';
import React from 'react';
import Animated from 'react-native-reanimated';
import ViewShot from 'react-native-view-shot';

const ViewArtistQRCodePage = () => {
	const { back } = useNavigation();
	const { artistPageHyperlink } = useHyperlink();
	const { theme } = useTheme();
	const { params } = useRoute<ViewArtistQRCodePageRouteProp>();
	const { copy } = useClipboard();
	const { captureWithOptions, viewShotRef, shareVia } = useShareViewShot(
		artistPageHyperlink(params.artist_uid)
	);
	return (
		<BlurView style={{ flex: 1 }}>
			<View flex={1} justifyContent='center' alignItems='center'>
				<Animated.View
					style={{
						backgroundColor: theme.colors['palette.neutral.p1'],
						borderRadius: 35,
						shadowColor: theme.colors['text.p'],
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.25,
						shadowRadius: 3.84,
						padding: theme.spacing['l']
					}}
					sharedTransitionTag={`artist-profile-qr-code-${params.artist_uid}`}
				>
					<ViewShot ref={viewShotRef}>
						<QRCode
							data={artistPageHyperlink(params.artist_uid)}
							size={5}
							gradient={{
								type: 'linear',
								options: {
									start: [0, 0],
									end: [1, 1],
									colors: ['#da0c8b', '#00bfff'],
									locations: [0, 1]
								}
							}}
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
							icon='save'
							onPress={captureWithOptions}
						/>
						<CircularButton
							title='Copy Link'
							icon='chainlink'
							onPress={() =>
								copy(artistPageHyperlink(params.artist_uid), {
									text1: 'Link Copied to Clipboard',
									text2: artistPageHyperlink(params.artist_uid),
									props: { icon: 'link' }
								})
							}
						/>
						<CircularButton
							title='Share Via'
							icon='share-external'
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

export default ViewArtistQRCodePage;
