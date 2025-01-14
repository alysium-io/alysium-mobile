import { Icon, Text, View } from '@atomic';
import { useImage } from '@hooks';
import { BlurView } from '@react-native-community/blur';
import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';

const SimpleEventIgStory = () => {
	const { width, height } = useWindowDimensions();
	const insets = useSafeAreaInsets();
	const { urlForKey } = useImage();
	const PROFILE_IMAGE_SIZE = 65;
	const PROFILE_IMAGE_CONTAINER_SIZE = PROFILE_IMAGE_SIZE + 11;
	const BANNER_HEIGHT = height * 0.5;

	return (
		<View
			flex={1}
			style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
		>
			<View style={StyleSheet.absoluteFill}>
				<Image
					source={require('../assets/banner.png')}
					style={{
						height: '100%',
						width: '100%'
					}}
				/>
				<BlurView
					style={StyleSheet.absoluteFill}
					blurType='dark'
					blurAmount={50}
				/>
			</View>
			<View margin='m' marginTop='none'>
				<Shadow
					startColor='rgba(255, 255, 255, 0.05)'
					endColor='rgba(255, 255, 255, 0)'
					distance={15}
					style={{
						height: BANNER_HEIGHT,
						width: '100%',
						borderRadius: 45
					}}
				>
					<Image
						source={require('../assets/banner.png')}
						style={{
							height: BANNER_HEIGHT,
							width: '100%',
							borderRadius: 45
						}}
					/>
				</Shadow>
			</View>
			<MaskedView
				style={StyleSheet.absoluteFill}
				maskElement={
					<View
						left={width / 2 - PROFILE_IMAGE_CONTAINER_SIZE / 2}
						top={insets.top + BANNER_HEIGHT - PROFILE_IMAGE_CONTAINER_SIZE / 2}
						height={PROFILE_IMAGE_CONTAINER_SIZE}
						width={PROFILE_IMAGE_CONTAINER_SIZE}
						borderRadius='round'
						style={{ backgroundColor: 'black' }}
					/>
				}
			>
				<View flex={1}>
					<Image
						source={require('../assets/banner.png')}
						style={{
							height: '100%',
							width: '100%'
						}}
					/>
					<BlurView
						style={StyleSheet.absoluteFill}
						blurType='dark'
						blurAmount={20}
					/>
				</View>
			</MaskedView>
			<Image
				source={require('../assets/brooks.png')}
				style={{
					height: PROFILE_IMAGE_SIZE,
					width: PROFILE_IMAGE_SIZE,
					position: 'absolute',
					left: width / 2 - PROFILE_IMAGE_SIZE / 2,
					top: insets.top + BANNER_HEIGHT - PROFILE_IMAGE_SIZE / 2,
					borderRadius: 999
				}}
			/>
			<View justifyContent='space-between' flex={1}>
				<View flexDirection='row' justifyContent='space-between'>
					<View marginHorizontal='m' flex={1}>
						<Text variant='paragraph-medium'>Tomorrow, 8:00pm</Text>
						<Text variant='paragraph-medium' color='text.q'>
							Fri. Dec. 23
						</Text>
					</View>

					{/** Spacer for profile image */}
					<View
						style={{
							aspectRatio: 1,
							width: PROFILE_IMAGE_CONTAINER_SIZE
						}}
					/>

					<View marginHorizontal='m' flex={1}>
						<Text variant='paragraph-medium' textAlign='right'>
							1262 Venice. Blvd
						</Text>
						<Text variant='paragraph-medium' textAlign='right' color='text.q'>
							Venice CA, 90291
						</Text>
					</View>
				</View>
				<View justifyContent='center' alignItems='center'>
					<Text variant='page-header' textAlign='center' marginBottom='s'>
						Brooks
					</Text>
					<Text
						variant='paragraph-large'
						textAlign='center'
						style={{ fontSize: 22 }}
						marginBottom='m'
					>
						EDX Nightclub
					</Text>
					<Icon name='logo' size='m' />
				</View>
			</View>
		</View>
	);
};

export default SimpleEventIgStory;
