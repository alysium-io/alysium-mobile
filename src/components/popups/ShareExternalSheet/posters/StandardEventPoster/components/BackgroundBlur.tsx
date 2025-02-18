import { Avatar, BlurView, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import React from 'react';
import { StyleSheet } from 'react-native';

interface BackgroundBlurProps {
	event: EventLink;
}

const BackgroundBlur: React.FC<BackgroundBlurProps> = ({ event }) => {
	return (
		<View style={StyleSheet.absoluteFill}>
			<Avatar
				image={event.event.profile_image?.large.key}
				containerProps={{
					style: {
						height: '100%',
						width: '100%'
					}
				}}
			/>
			<BlurView
				style={StyleSheet.absoluteFill}
				blurType='dark'
				blurAmount={50}
			/>
		</View>
	);
};

export default BackgroundBlur;
