import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Text, View } from '@atomic';
import { useHyperlink, useQRCodeSize, useSheet, useTheme } from '@hooks';
import { EPKExplanationBottomSheet } from '@popups';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-styled';

const ShareEpkSection = () => {
	const { theme } = useTheme();
	const { artistPageHyperlink } = useHyperlink();
	const { artistData } = useArtistAppContext();
	const qrCodeSizes = useQRCodeSize();
	const epkExplanationBottomSheet = useSheet();
	return (
		<View alignItems='center' marginVertical='xxl'>
			<View
				style={{
					backgroundColor: theme.colors['bg.p'],
					borderRadius: 25,
					shadowColor: theme.colors['text.p'],
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.25,
					shadowRadius: 3.84
				}}
			>
				<QRCode
					data={artistPageHyperlink(artistData.artist_uid)}
					style={styles.svg}
					gradient={{
						type: 'linear',
						options: {
							start: [0, 0],
							end: [1, 1],
							colors: ['#da0c8b', '#00bfff'],
							locations: [0, 1]
						}
					}}
					{...qrCodeSizes}
				/>
				<View
					borderTopWidth={2}
					backgroundColor='bg.negative.p'
					style={{
						borderTopColor: 'rgba(150, 150, 150, 1)',
						borderBottomLeftRadius: 25,
						borderBottomRightRadius: 25
					}}
				>
					<Text
						variant='section-header-1'
						marginVertical='m'
						textAlign='center'
						color='text.negative.p'
					>
						EPK
					</Text>
				</View>
			</View>
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

const styles = StyleSheet.create({
	svg: {
		overflow: 'hidden'
	}
});

export default ShareEpkSection;
