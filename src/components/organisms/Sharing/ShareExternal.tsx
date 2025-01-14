import { View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import {
	SheetApi,
	useClipboard,
	useHyperlink,
	useLayoutDimensions
} from '@hooks';
import { BottomSheet } from '@organisms';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ViewShot from 'react-native-view-shot';
import ContentContainer from './components/ContentContainer';
import CustomShareButtonIcon from './components/CustomShareButtonIcon';
import ShareButton from './components/ShareButton';
import StandardEventPoster from './posters/StandardEventPoster';
import useShareViewShot from './useShareViewShot';

interface ShareExternalProps {
	event: EventLink;
	sheetApi: SheetApi;
}

const ShareExternal: React.FC<ShareExternalProps> = ({ sheetApi, event }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { eventPageHyperlink } = useHyperlink();
	const link = eventPageHyperlink(event.event.event_uid);
	const { copy } = useClipboard();
	const { dimensions: posterDimensions, onLayout: onPosterLayout } =
		useLayoutDimensions();
	const {
		viewShotRef,
		shareIGStory,
		shareiMessage,
		shareVia,
		captureWithOptions
	} = useShareViewShot(link);

	const CBottomSheetBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<ContentContainer {...props}>
				<ViewShot ref={viewShotRef} style={StyleSheet.absoluteFillObject}>
					<View
						onLayout={onPosterLayout}
						style={{
							height: '100%',
							width: '100%'
						}}
						pointerEvents='box-none'
					>
						<StandardEventPoster
							posterDimensions={posterDimensions}
							event={event}
						/>
					</View>
				</ViewShot>
			</ContentContainer>
		),
		[event, posterDimensions, onPosterLayout]
	);

	const onChange = useCallback((index: number) => {
		setIsOpen(index !== -1);
	}, []);

	useEffect(() => {
		if (isOpen) {
			sheetApi.sheetRef.current?.snapToIndex(1);
		}
	}, [isOpen]);

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			snapPoints={['5%', '20%', '40%']}
			backdropComponent={CBottomSheetBackdrop}
			enableContentPanningGesture={true}
			backgroundStyle={styles.bottomSheet}
			onChange={onChange}
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
					onPress={() => copy(link, { text2: 'You can now share this event' })}
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
