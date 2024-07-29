import { BgTouchAnimation, Icon, View } from '@atomic';
import React from 'react';
import Container from './components/Container';
import ProfileImage from './components/ProfileImage';
import Rank from './components/Rank';
import TitleText from './components/TitleText';

interface ContentListItemWithRankProps {
	containerProps?: React.ComponentProps<typeof Container>;
	titleTextProps: React.ComponentProps<typeof TitleText>;
	profileImageProps?: React.ComponentProps<typeof ProfileImage>;
	onPress?: () => void;
	rank: number;
}

const ContentListItemWithRank: React.FC<ContentListItemWithRankProps> = ({
	containerProps,
	titleTextProps,
	profileImageProps,
	onPress,
	rank
}) => {
	return (
		<BgTouchAnimation onPress={onPress}>
			<Container {...containerProps}>
				<View marginRight='m'>
					<Rank rank={rank} />
				</View>
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

export default ContentListItemWithRank;
