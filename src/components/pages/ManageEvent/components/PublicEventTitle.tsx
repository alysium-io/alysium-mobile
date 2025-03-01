import { Avatar, Text, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { StartsInCountdown, WhenWhereWhySubHeader } from '@templates';
import React from 'react';

interface PublicEventTitleProps {
	event: EventLink;
}

const PublicEventTitle: React.FC<PublicEventTitleProps> = ({ event }) => {
	return (
		<View margin='m'>
			<View flexDirection='row' alignItems='center' marginBottom='m'>
				<View height={100} width={100}>
					<Avatar
						image={event.event.profile_image?.medium.key}
						defaultImageProps={{
							icon: 'event'
						}}
					/>
				</View>
				<View marginLeft='m' flex={1}>
					<Text
						variant='paragraph-large-medium'
						marginBottom='s'
						numberOfLines={2}
						adjustsFontSizeToFit
						minimumFontScale={0.8}
					>
						{event.event.name}
					</Text>
					<StartsInCountdown event={event.event} />
				</View>
			</View>
			<WhenWhereWhySubHeader event={event} />
		</View>
	);
};

export default PublicEventTitle;
