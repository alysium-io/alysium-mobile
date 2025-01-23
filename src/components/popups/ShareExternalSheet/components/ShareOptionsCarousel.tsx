import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CustomShareButtonIcon from './CustomShareButtonIcon';
import ShareButton from './ShareButton';

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
		<ScrollView horizontal style={{ margin: 15 }}>
			<ShareButton
				CustomImage={() => <CustomShareButtonIcon icon='save' />}
				title='Save Image'
				onPress={onPressSaveImage}
			/>
			<ShareButton
				CustomImage={() => <CustomShareButtonIcon icon='chainlink' />}
				title='Copy Link'
				onPress={onPressCopyLink}
			/>
			<ShareButton
				CustomImage={() => <CustomShareButtonIcon icon='share-external' />}
				title='Share Via'
				onPress={onPressShareVia}
			/>
			<ShareButton
				image='instagram'
				title='Story'
				onPress={onPressShareIGStory}
			/>
			<ShareButton
				image='imessage'
				title='iMessage'
				onPress={onPressShareiMessage}
			/>
		</ScrollView>
	);
};

export default ShareOptionsCarousel;
