import { Section, Text, View } from '@atomic';
import { FindOneEventResponseDto } from '@flux/api/event/dto/event-find-one.dto';
import { useDriveTime, useEventDateFormatter, useLocation } from '@hooks';
import React from 'react';
import { Else, If, Then } from 'react-if';
import { TouchableOpacity } from 'react-native';

interface SubHeaderProps {
	eventData: FindOneEventResponseDto;
}

const SubHeader: React.FC<SubHeaderProps> = ({ eventData }) => {
	const dateApi = useEventDateFormatter(eventData.event.start_time);
	const locationApi = useLocation(eventData.event.location);
	const onPressLocation = () => locationApi.openMap(eventData.event.name);
	const { formattedDriveTime } = useDriveTime(eventData.event.location);

	const { title: locationTitle, subtitle: locationSubtitle } =
		locationApi.getDisplayParts();

	const { title: dateTitle, subtitle: dateSubtitle } =
		dateApi.getDisplayParts();

	return (
		<Section marginBottom='s'>
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
			<View width='75%'>
				<Text variant='paragraph-small'>{eventData.event.about}</Text>
			</View>
		</Section>
	);
};

export default SubHeader;
