import { BgTouchAnimation, Icon, View } from '@atomic';
import React from 'react';
import Container from './components/Container';
import ProfileImage from './components/ProfileImage';
import TitleText from './components/TitleText';

interface ContentListItemProps {
	containerProps?: React.ComponentProps<typeof Container>;
	titleTextProps: React.ComponentProps<typeof TitleText>;
	profileImageProps?: React.ComponentProps<typeof ProfileImage>;
	onPress?: () => void;
}

const ContentListItem: React.FC<ContentListItemProps> = ({
	containerProps,
	titleTextProps,
	profileImageProps,
	onPress
}) => {
	return (
		<BgTouchAnimation onPress={onPress}>
			<Container {...containerProps}>
				<View marginRight='m'>
					<ProfileImage {...profileImageProps} />
				</View>
				<TitleText {...titleTextProps} />
				<View marginHorizontal='m'>
					<Icon name='arrow-right' color='text.t' size='s' />
				</View>
			</Container>
		</BgTouchAnimation>
	);
};

export default ContentListItem;
