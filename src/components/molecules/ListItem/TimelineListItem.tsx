import { BgTouchAnimation, View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import Container from './components/Container';
import FixedEndText from './components/FixedEndText';
import ProfileImage from './components/ProfileImage';
import TitleText from './components/TitleText';
import TimeLine from './TimeLine/TimeLine';

interface TimelineListItemProps {
	onPress?: () => void;
	timeLineProps?: Props<typeof TimeLine>;
	titleTextProps: Props<typeof TitleText>;
	profileImageProps?: Props<typeof ProfileImage>;
	fixedTextProps: Props<typeof FixedEndText>;
}

const TimelineListItem: React.FC<TimelineListItemProps> = ({
	onPress,
	timeLineProps,
	titleTextProps,
	profileImageProps,
	fixedTextProps
}) => {
	return (
		<BgTouchAnimation disabled={onPress === undefined} onPress={onPress}>
			<Container border={false} paddingVertical='none' height={100}>
				{profileImageProps && (
					<View marginRight='m'>
						<ProfileImage borderRadius='none' {...profileImageProps} />
					</View>
				)}
				<TitleText {...titleTextProps} />
				<TimeLine {...timeLineProps} />
				<FixedEndText {...fixedTextProps} />
			</Container>
		</BgTouchAnimation>
	);
};

export default TimelineListItem;
