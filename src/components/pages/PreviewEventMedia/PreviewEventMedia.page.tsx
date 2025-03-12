import { BlurView, View } from '@atomic';
import { useImage, useNavigation, useTheme } from '@hooks';
import { Button } from '@molecules';
import { useRoute } from '@react-navigation/native';
import { PreviewEventMediaPageRouteProp } from '@types';
import React from 'react';
import Animated from 'react-native-reanimated';

const PreviewEventMediaPage = () => {
	const { theme } = useTheme();
	const { back } = useNavigation();
	const { params } = useRoute<PreviewEventMediaPageRouteProp>();
	const { urlForKey } = useImage();

	return (
		<BlurView style={{ flex: 1 }} blurAmount={50}>
			<View flex={1} justifyContent='center' alignItems='center' rowGap='l'>
				<Animated.Image
					style={{
						overflow: 'hidden',
						height: 200,
						width: 200,
						backgroundColor: theme.colors['palette.neutral.p1'],
						borderRadius: theme.borderRadii.xl,
						shadowColor: theme.colors['text.p'],
						shadowOffset: { width: 0, height: 0 },
						shadowOpacity: 0.5,
						shadowRadius: 3.84,
						padding: theme.spacing['l'],
						borderWidth: theme.borderWidth.normal,
						borderColor: theme.colors['border.light']
					}}
					sharedTransitionTag={`preview-event-media-${params.eventMedia.event_media_uid}`}
					source={{
						uri: urlForKey(params.eventMedia.multimedia.image?.original.key)
					}}
				/>
				<Button
					containerProps={{
						paddingHorizontal: 'l'
					}}
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
		</BlurView>
	);
};

export default PreviewEventMediaPage;
