import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { QRCode, Text, View } from '@atomic';
import {
	useClipboard,
	useHyperlink,
	useShareViewShot,
	useSheet,
	useTheme
} from '@hooks';
import { CircularButton } from '@molecules';
import { EPKExplanationBottomSheet } from '@popups';
import React from 'react';
import { Pressable } from 'react-native-gesture-handler';
import ViewShot from 'react-native-view-shot';

const ShareEpkSection = () => {
	const { theme } = useTheme();
	const { artistPageHyperlink } = useHyperlink();
	const { artistData } = useArtistAppContext();
	const epkExplanationBottomSheet = useSheet();
	const { copy } = useClipboard();
	const { captureWithOptions, viewShotRef, shareVia } = useShareViewShot(
		artistPageHyperlink(artistData.artist_uid)
	);

	return (
		<View alignItems='center' marginVertical='xxl' gap='m'>
			<View
				style={{
					backgroundColor: theme.colors['palette.neutral.p1'],
					borderRadius: 35,
					shadowColor: theme.colors['text.p'],
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.25,
					shadowRadius: 3.84,
					padding: theme.spacing['l']
				}}
			>
				<ViewShot ref={viewShotRef}>
					<QRCode
						data={artistPageHyperlink(artistData.artist_uid)}
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
			</View>
			<View
				flexDirection='row'
				alignItems='center'
				justifyContent='space-between'
				gap='xl'
				margin='m'
			>
				<CircularButton
					title='Save Image'
					onPress={captureWithOptions}
					titleProps={{ color: 'text.q', variant: 'paragraph-small' }}
					iconProps={{
						name: 'save',
						color: 'text.s'
					}}
				/>
				<CircularButton
					title='Copy Link'
					onPress={() =>
						copy(artistPageHyperlink(artistData.artist_uid), {
							text1: 'Link Copied to Clipboard',
							text2: artistPageHyperlink(artistData.artist_uid),
							props: { icon: 'link' }
						})
					}
					titleProps={{ color: 'text.q', variant: 'paragraph-small' }}
					iconProps={{
						name: 'chainlink',
						color: 'text.s'
					}}
				/>
				<CircularButton
					title='Share Via'
					onPress={shareVia}
					titleProps={{ color: 'text.q', variant: 'paragraph-small' }}
					iconProps={{
						name: 'share-external',
						color: 'text.s'
					}}
				/>
			</View>
			<View>
				<Pressable onPress={epkExplanationBottomSheet.open}>
					<Text
						variant='paragraph'
						color='text.q'
						textDecorationLine='underline'
					>
						What is this?
					</Text>
				</Pressable>
			</View>
			<EPKExplanationBottomSheet sheetApi={epkExplanationBottomSheet} />
		</View>
	);
};

export default ShareEpkSection;
