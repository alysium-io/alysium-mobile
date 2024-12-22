import { BgTouchAnimation, Icon, View } from '@atomic';
import { IconNames } from '@svg';
import { Props } from '@types';
import React from 'react';
import Container from './components/Container';
import ProfileImage from './components/ProfileImage';
import TitleText from './components/TitleText';

interface ContentListItemProps {
	containerProps?: Props<typeof Container>;
	titleTextProps: Props<typeof TitleText>;
	profileImageProps?: Props<typeof ProfileImage>;
	onPress?: () => void;
	icon?: IconNames | null;
}

const ContentListItem: React.FC<ContentListItemProps> = ({
	containerProps,
	titleTextProps,
	profileImageProps,
	onPress,
	icon = 'arrow-right'
}) => {
	return (
		<BgTouchAnimation onPress={onPress}>
			<Container {...containerProps}>
				<View marginRight='m'>
					<ProfileImage {...profileImageProps} />
				</View>
				<TitleText {...titleTextProps} />
				{icon !== null && (
					<View marginHorizontal='m'>
						<Icon name={icon} color='text.t' size='s' />
					</View>
				)}
			</Container>
		</BgTouchAnimation>
	);
};

export default ContentListItem;
