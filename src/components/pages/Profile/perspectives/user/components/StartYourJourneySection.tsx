import { Icon, Image, LinearGradient, Text, View } from '@atomic';
import { useCreateArtistContext } from '@popups';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
const singer = require('@src/assets/images/singer.png');

const StartYourJourneySection = () => {
	const { createArtistSheetApi } = useCreateArtistContext();
	return (
		<Pressable onPress={createArtistSheetApi.open}>
			<View
				margin='m'
				marginBottom='xxxl'
				height={300}
				overflow='hidden'
				style={{ borderRadius: 50 }}
				position='relative'
			>
				<LinearGradient
					start={{ x: -0.2, y: 0 }}
					end={{ x: 0, y: 1 }}
					colors={['rgba(255, 255, 255, 1)', '#FFF3D6']}
					style={StyleSheet.absoluteFill}
				/>
				<View height={150} width={150} position='absolute' top={20} right={20}>
					<Image style={{ height: '100%', width: '100%' }} source={singer} />
				</View>
				<View
					position='absolute'
					bottom='10%'
					left='10%'
					right='10%'
					flexDirection='row'
					alignItems='center'
					justifyContent='space-between'
					flex={1}
				>
					<View rowGap='xs'>
						<Text variant='page-header' color='black' style={{ fontSize: 26 }}>
							Create an Artist
						</Text>
						<Text variant='paragraph-small-medium' color='palette.neutral.p8'>
							1. Create Events
						</Text>
						<Text variant='paragraph-small-medium' color='palette.neutral.p8'>
							2. Share it with your fans
						</Text>
						<Text variant='paragraph-small-medium' color='palette.neutral.p8'>
							3. Save it to your EPK
						</Text>
					</View>
					<View style={{ transform: [{ rotate: '90deg' }] }}>
						<Icon name='tailed-arrow' color='palette.neutral.p8' size='m' />
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default StartYourJourneySection;
