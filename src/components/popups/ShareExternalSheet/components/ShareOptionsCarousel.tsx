import { CircularButton } from '@molecules';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

interface ShareOptionsCarouselProps {
	onPressSaveImage: () => void;
	onPressCopyLink: () => void;
	onPressShareVia: () => void;
	onPressShareIGStory: () => void;
	onPressShareiMessage: () => void;
}

const ShareOptionsCarousel: React.FC<ShareOptionsCarouselProps> = ({
	onPressSaveImage,
	onPressCopyLink,
	onPressShareVia,
	onPressShareIGStory,
	onPressShareiMessage
}) => {
	return (
		<ScrollView
			horizontal
			style={{ margin: 15 }}
			contentContainerStyle={{ gap: 15 }}
		>
			<CircularButton
				icon='save'
				title='Save Image'
				onPress={onPressSaveImage}
				titleProps={{ color: 'palette.neutral.p9' }}
			/>
			<CircularButton
				icon='chainlink'
				title='Copy Link'
				onPress={onPressCopyLink}
				titleProps={{ color: 'palette.neutral.p9' }}
			/>
			<CircularButton
				icon='share-external'
				title='Share Via'
				onPress={onPressShareVia}
				titleProps={{ color: 'palette.neutral.p9' }}
			/>
			<CircularButton
				image='instagram'
				title='Story'
				onPress={onPressShareIGStory}
				titleProps={{ color: 'palette.neutral.p9' }}
			/>
			<CircularButton
				image='imessage'
				title='iMessage'
				onPress={onPressShareiMessage}
				titleProps={{ color: 'palette.neutral.p9' }}
			/>
		</ScrollView>
	);
};

export default ShareOptionsCarousel;
