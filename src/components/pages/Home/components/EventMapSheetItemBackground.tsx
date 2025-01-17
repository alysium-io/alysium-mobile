import { Avatar, BlurView, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useTheme } from '@hooks';
import { ThemeMode } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';

interface EventMapSheetItemBackgroundProps {
	event: EventLink | null;
}

const EventMapSheetItemBackground: React.FC<
	EventMapSheetItemBackgroundProps
> = ({ event }) => {
	const { themeMode } = useTheme();
	if (!event) return null;

	return (
		<View
			style={[
				StyleSheet.absoluteFillObject,
				{
					borderTopLeftRadius: 25,
					borderTopRightRadius: 25,
					overflow: 'hidden',
					height: '200%'
				}
			]}
		>
			<Avatar
				image={event?.event.profile_image?.large.key}
				borderRadius='none'
			/>
			<BlurView
				blurAmount={20}
				blurType={
					themeMode === ThemeMode.dark
						? 'chromeMaterialDark'
						: 'chromeMaterialLight'
				}
				style={StyleSheet.absoluteFillObject}
			/>
		</View>
	);
};

export default EventMapSheetItemBackground;
