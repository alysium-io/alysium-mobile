import { Text, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useDriveTime, useEventDateFormatter, useLocation } from '@hooks';
import React from 'react';
import { Else, If, Then } from 'react-if';
import { TouchableOpacity } from 'react-native';

interface WhenWhereWhySubHeaderProps {
	event: EventLink;
}

const WhenWhereWhySubHeader: React.FC<WhenWhereWhySubHeaderProps> = ({
	event
}) => {
	const dateApi = useEventDateFormatter(event.event.start_time);
	const locationApi = useLocation(event.event.location);
	const onPressLocation = () => locationApi.openMap(event.event.name);
	const { formattedDriveTime } = useDriveTime(event.event.location);

	const { title: locationTitle, subtitle: locationSubtitle } =
		locationApi.getDisplayParts();

	const { title: dateTitle, subtitle: dateSubtitle } =
		dateApi.getDisplayParts();

	return (
		<View gap='m'>
			<View flexDirection='row' justifyContent='space-between' gap='m'>
				<View flex={1}>
					<Text variant='paragraph-large-medium' marginBottom='xs'>
						{dateTitle}
					</Text>
					<Text variant='paragraph' color='text.t' marginBottom='xs'>
						{dateSubtitle}
					</Text>
				</View>
				<View flex={1}>
					<If condition={locationApi.hasLocation}>
						<Then>
							<TouchableOpacity onPress={onPressLocation} activeOpacity={0.5}>
								<View>
									{formattedDriveTime && (
										<Text
											variant='paragraph-small'
											color='text.q'
											marginBottom='xs'
											textAlign='right'
										>
											{formattedDriveTime}
										</Text>
									)}
									<Text
										variant='paragraph-large-medium'
										marginBottom='xs'
										textAlign='right'
									>
										{locationTitle}
									</Text>
									<Text
										variant='paragraph'
										color='text.t'
										marginBottom='xs'
										textAlign='right'
									>
										{locationSubtitle}
									</Text>
								</View>
							</TouchableOpacity>
						</Then>
						<Else>
							<Text
								variant='paragraph-medium'
								marginBottom='xs'
								textAlign='right'
							>
								No Location
							</Text>
						</Else>
					</If>
				</View>
			</View>
			{event.event.about && (
				<Text variant='paragraph-small' textAlign='center'>
					{event.event.about}
				</Text>
			)}
		</View>
	);
};

export default WhenWhereWhySubHeader;
