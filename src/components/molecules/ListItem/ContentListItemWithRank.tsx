import { BgTouchAnimation, Icon, View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import Container from './components/Container';
import ProfileImage from './components/ProfileImage';
import Rank from './components/Rank';
import TitleText from './components/TitleText';

interface ContentListItemWithRankProps {
	containerProps?: Props<typeof Container>;
	titleTextProps: Props<typeof TitleText>;
	profileImageProps?: Props<typeof ProfileImage>;
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
				{profileImageProps && (
					<View marginRight='m'>
						<ProfileImage {...profileImageProps} />
					</View>
				)}
				<TitleText {...titleTextProps} />
				<View marginHorizontal='m'>
					<Icon name='arrow-right' color='text.t' size='s' />
				</View>
			</Container>
		</BgTouchAnimation>
	);
};

export default ContentListItemWithRank;
