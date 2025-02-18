import { View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import {
	SheetApi,
	useClipboard,
	useHyperlink,
	useLayoutDimensions,
	useShareViewShot
} from '@hooks';
import { BottomSheet } from '@organisms';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import ViewShot from 'react-native-view-shot';
import ContentContainer from './components/ContentContainer';
import ShareOptionsCarousel from './components/ShareOptionsCarousel';
import StandardEventPoster from './posters/StandardEventPoster/StandardEventPoster';

interface ShareEventPosterSheetProps {
	event: EventLink;
	sheetApi: SheetApi;
}

const ShareEventPosterSheet: React.FC<ShareEventPosterSheetProps> = ({
	sheetApi,
	event
}) => {
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
			ref={sheetApi.sheetRef}
			snapPoints={['5%', '20%', '40%']}
			backdropComponent={CBottomSheetBackdrop}
			enableContentPanningGesture={true}
			backgroundStyle={styles.bottomSheet}
			onChange={onChange}
		>
			<ShareOptionsCarousel
				onPressSaveImage={captureWithOptions}
				onPressCopyLink={() =>
					copy(link, { text2: 'You can now share this event' })
				}
				onPressShareVia={shareVia}
				onPressShareIGStory={shareIGStory}
				onPressShareiMessage={shareiMessage}
			/>
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

export default ShareEventPosterSheet;
