import { BlurView, Image, Text, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import {
	BottomSheetBackdrop,
	BottomSheetBackdropProps
} from '@gorhom/bottom-sheet';
import { SheetApi, useClipboard, useHyperlink, useImage } from '@hooks';
import { BottomSheet } from '@organisms';
import SubHeader from '@src/components/pages/Event/components/SubHeader';
import React, { useCallback } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import CustomShareButtonIcon from './components/CustomShareButtonIcon';
import ShareButton from './components/ShareButton';
import useShareViewShot from './useShareViewShot';

interface ShareExternalProps {
	event: EventLink;
	sheetApi: SheetApi;
}

const ShareExternal: React.FC<ShareExternalProps> = ({ sheetApi, event }) => {
	const insets = useSafeAreaInsets();
	const { height } = useWindowDimensions();
	const { urlForKey } = useImage();
	const { eventPageHyperlink } = useHyperlink();
	const link = eventPageHyperlink(event.event.event_uid);
	const {
		viewShotRef,
		shareIGStory,
		shareiMessage,
		shareVia,
		captureWithOptions
	} = useShareViewShot(link);
	const { copy } = useClipboard();

	const CBottomSheetBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
				opacity={1}
				enableTouchThrough={false}
				appearsOnIndex={0}
				disappearsOnIndex={-1}
				style={[
					StyleSheet.absoluteFillObject,
					{ backgroundColor: 'transparent' }
				]}
			>
				<BlurView style={StyleSheet.absoluteFillObject}>
					<View
						style={{
							margin: 15,
							height: '70%',
							borderRadius: 25,
							overflow: 'hidden',
							marginTop: insets.top
						}}
						pointerEvents='none'
					>
						<ViewShot ref={viewShotRef} style={StyleSheet.absoluteFillObject}>
							<View backgroundColor='bg.p' flex={1} justifyContent='flex-start'>
								<View height={height * 0.25} justifyContent='flex-end'>
									<Image
										style={{
											position: 'absolute',
											height: '100%',
											width: '100%'
										}}
										source={{
											uri: urlForKey(event.event.profile_image?.large.key)
										}}
									/>
									<Text
										variant='page-header'
										textAlign='center'
										color='palette.neutral.p1'
										margin='m'
										style={{
											textShadowColor: 'rgba(0, 0, 0, 0.25)',
											textShadowOffset: { width: 1, height: 1 },
											textShadowRadius: 10
										}}
									>
										{event.event.name}
									</Text>
								</View>
								<View margin='m'>
									<SubHeader eventData={event} />
								</View>
								<View alignItems='center' marginTop='m'>
									<Image
										style={{
											height: 100,
											width: 100,
											borderRadius: 999
										}}
										source={{
											uri: urlForKey(event.artist?.profile_image?.small.key)
										}}
									/>
									<Text variant='paragraph' color='text.q' marginTop='m'>
										Featuring
									</Text>
									<Text variant='paragraph-medium'>
										{event.artist?.name || 'Unknown'}
									</Text>
								</View>
							</View>
						</ViewShot>
					</View>
				</BlurView>
			</BottomSheetBackdrop>
		),
		[event]
	);

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			snapPoints={['20%', '40%']}
			backdropComponent={CBottomSheetBackdrop}
			enableContentPanningGesture={true}
			backgroundStyle={styles.bottomSheet}
		>
			<ScrollView horizontal style={{ margin: 15 }}>
				<ShareButton
					CustomImage={() => <CustomShareButtonIcon icon='save' />}
					title='Save Image'
					onPress={captureWithOptions}
				/>
				<ShareButton
					CustomImage={() => <CustomShareButtonIcon icon='chainlink' />}
					title='Copy Link'
					onPress={() => copy(link)}
				/>
				<ShareButton
					CustomImage={() => <CustomShareButtonIcon icon='share-external' />}
					title='Share Via'
					onPress={shareVia}
				/>
				<ShareButton image='instagram' title='Story' onPress={shareIGStory} />
				<ShareButton
					image='imessage'
					title='iMessage'
					onPress={shareiMessage}
				/>
			</ScrollView>
		</BottomSheet>
	);
};

const styles = StyleSheet.create({
	bottomSheet: {
		borderRadius: 25,
		backgroundColor: 'white',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 7
		},
		shadowOpacity: 0.41,
		shadowRadius: 9.11,
		elevation: 14
	}
});

export default ShareExternal;
