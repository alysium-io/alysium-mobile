import { Avatar, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import React from 'react';
import { Shadow } from 'react-native-shadow-2';

interface BannerImageProps {
	event: EventLink;
	height: number;
}

const BannerImage: React.FC<BannerImageProps> = ({ event, height }) => {
	return (
		<View margin='m' marginTop='none'>
			<Shadow
				startColor='rgba(255, 255, 255, 0.05)'
				endColor='rgba(255, 255, 255, 0)'
				distance={15}
				style={{
					height: height,
					width: '100%',
					borderRadius: 45
				}}
			>
				<Avatar
					image={event.event.profile_image?.large.key}
					defaultImageProps={{
						icon: 'event',
						iconProps: {
							size: 'xl'
						},
						containerProps: {
							style: {
								aspectRatio: undefined,
								width: '100%'
							}
						}
					}}
					containerProps={{
						style: {
							height: height,
							width: '100%',
							borderRadius: 45
						}
					}}
				/>
			</Shadow>
		</View>
	);
};

export default BannerImage;
