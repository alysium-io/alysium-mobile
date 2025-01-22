import { Text, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useDriveTime, useEventDateFormatter, useLocation } from '@hooks';
import React from 'react';
import { Else, If, Then } from 'react-if';
import { TouchableOpacity } from 'react-native';

interface EventMapSheetItemSubHeaderProps {
	event: EventLink | null;
}

const EventMapSheetItemSubHeader: React.FC<EventMapSheetItemSubHeaderProps> = ({
	event
}) => {
	const dateFormatter = useEventDateFormatter(event?.event.start_time);
	const locationFormatter = useLocation(event?.event.location);
	const { title: dateTitle, subtitle: dateSubtitle } =
		dateFormatter.getDisplayParts();
	const { title: locationTitle, subtitle: locationSubtitle } =
		locationFormatter.getDisplayParts();
	const { formattedDriveTime } = useDriveTime(event?.event.location);
	const onPressLocation = () => locationFormatter.openMap(event?.event.name);

	if (!event) return null;

	return (
		<View padding='s'>
			<View flexDirection='row' justifyContent='space-between' marginBottom='m'>
				<View flex={1}>
					<Text variant='paragraph-large-medium' marginBottom='xs'>
						{dateTitle}
					</Text>
					<Text variant='paragraph' color='text.t' marginBottom='xs'>
						{dateSubtitle}
					</Text>
				</View>
				<View flex={1}>
					<If condition={locationFormatter.hasLocation}>
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
			<View>
				<Text variant='paragraph-small' textAlign='center' color='text.s'>
					{event.event.about}
				</Text>
			</View>
		</View>
	);
};

export default EventMapSheetItemSubHeader;
