import { AView, BlurView, Image, Text } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useImage, useTheme } from '@hooks';
import { useHeader } from '@organisms';
import React from 'react';
import { Pressable } from 'react-native';
import { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NumEventsNotificationProps {
	show: boolean;
	eventsData: EventLink[];
	onPress: () => void;
}

const NumEventsNotification: React.FC<NumEventsNotificationProps> = ({
	show,
	eventsData,
	onPress
}) => {
	const { top } = useSafeAreaInsets();
	const { theme } = useTheme();
	const { headerHeight } = useHeader();
	const { urlForKey } = useImage();

	const displayEvent = eventsData?.[0];
	const numEvents = eventsData?.length;

	if (!displayEvent || !show) {
		return null;
	}

	return (
		<AView
			entering={FadeInUp}
			exiting={FadeOutUp}
			position='absolute'
			top={top + headerHeight + theme.spacing.m}
			left={0}
			right={0}
			justifyContent='center'
			alignItems='center'
			zIndex={99999}
		>
			<Pressable onPress={onPress}>
				<BlurView
					blurType='chromeMaterialDark'
					style={{
						paddingHorizontal: theme.spacing.m,
						paddingVertical: theme.spacing.s,
						borderRadius: theme.borderRadii.l,
						flexDirection: 'row',
						alignItems: 'center',
						gap: theme.spacing.s,
						borderWidth: theme.borderWidth.hairline,
						borderColor: '#444'
					}}
				>
					<Image
						source={{
							uri: urlForKey(displayEvent.event.profile_image?.small.key)
						}}
						style={{
							width: 40,
							height: 40,
							borderRadius: theme.borderRadii.round
						}}
					/>
					<Text variant='paragraph-medium' color='white'>
						{numEvents} Event{numEvents > 1 ? 's' : ''}
					</Text>
				</BlurView>
			</Pressable>
		</AView>
	);
};

export default NumEventsNotification;
