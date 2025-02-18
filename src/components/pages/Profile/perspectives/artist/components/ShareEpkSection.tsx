import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { QRCode, Text, View } from '@atomic';
import { Vibrator } from '@etc';
import { useHyperlink, useNavigation, useSheet, useTheme } from '@hooks';
import { EPKExplanationBottomSheet } from '@popups';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const ShareEpkSection = () => {
	const { theme } = useTheme();
	const { artistPageHyperlink } = useHyperlink();
	const { artistData } = useArtistAppContext();
	const epkExplanationBottomSheet = useSheet();
	const { viewArtistQRCodePage } = useNavigation();

	return (
		<View alignItems='center' marginVertical='xxl'>
			<TouchableWithoutFeedback
				onPress={() => {
					Vibrator.soft();
					viewArtistQRCodePage(artistData.artist_uid);
				}}
			>
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
					sharedTransitionTag={`artist-profile-qr-code-${artistData.artist_uid}`}
				>
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
				</Animated.View>
			</TouchableWithoutFeedback>
			<View marginTop='xl'>
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
