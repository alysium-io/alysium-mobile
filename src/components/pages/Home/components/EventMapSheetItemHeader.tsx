import { Avatar, AView, Text } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useEventDateFormatter, useLocation, useTheme } from '@hooks';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import {
	Extrapolation,
	interpolate,
	SharedValue,
	useAnimatedStyle
} from 'react-native-reanimated';

interface EventMapSheetItemHeaderProps {
	event: EventLink | null;
	animatedPosition: SharedValue<number>;
}

const EventMapSheetItemHeader: React.FC<EventMapSheetItemHeaderProps> = ({
	event,
	animatedPosition
}) => {
	const { width, height } = useWindowDimensions();
	const { theme } = useTheme();

	const dateFormatter = useEventDateFormatter(event?.event.start_time);
	const locationFormatter = useLocation(event?.event.location);

	const { title: dateTitle } = dateFormatter.getDisplayParts();
	const { title: locationTitle } = locationFormatter.getDisplayParts();

	const animatedTextContainerStyle = useAnimatedStyle(() => {
		return {
			marginLeft: 15,
			flex: 1,
			justifyContent: 'center',
			opacity: interpolate(
				animatedPosition.value,
				[0, 1],
				[1, 0],
				Extrapolation.CLAMP
			)
		};
	}, []);

	const animatedHeaderContainerStyle = useAnimatedStyle(() => {
		return {
			margin: interpolate(animatedPosition.value, [0, 1], [theme.spacing.m, 0])
		};
	}, []);

	const animatedImageContainerStyle = useAnimatedStyle(() => {
		return {
			width: interpolate(animatedPosition.value, [0, 1], [100, width]),
			height: interpolate(animatedPosition.value, [0, 1], [100, height * 0.2]),
			borderTopLeftRadius: 25,
			borderTopRightRadius: 25,
			borderBottomLeftRadius: interpolate(
				animatedPosition.value,
				[0, 1],
				[25, 0]
			),
			borderBottomRightRadius: interpolate(
				animatedPosition.value,
				[0, 1],
				[25, 0]
			),
			overflow: 'hidden'
		};
	}, []);

	if (!event) return null;

	return (
		<AView flexDirection='row' style={animatedHeaderContainerStyle}>
			<AView style={animatedImageContainerStyle}>
				<Avatar
					image={event.event.profile_image?.large.key}
					borderRadius='none'
				/>
			</AView>
			<AView style={animatedTextContainerStyle}>
				<Text variant='paragraph-medium' marginBottom='xs' numberOfLines={1}>
					{event.event.name}
				</Text>
				<Text
					variant='paragraph'
					color='text.s'
					marginBottom='xs'
					numberOfLines={1}
				>
					{locationTitle}
				</Text>
				<Text variant='paragraph' color='text.s' numberOfLines={1}>
					{dateTitle}
				</Text>
			</AView>
		</AView>
	);
};

export default EventMapSheetItemHeader;
