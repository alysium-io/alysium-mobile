import { Section, Text, View } from '@atomic';
import { FindOneEventResponseDto } from '@flux/api/event/dto/event-find-one.dto';
import { useDateFormatter, useDriveTime, useLocation } from '@hooks';
import dayjs from 'dayjs';
import React from 'react';
import { Else, If, Then } from 'react-if';
import { TouchableOpacity } from 'react-native';

interface SubHeaderProps {
	eventData: FindOneEventResponseDto;
}

const SubHeader: React.FC<SubHeaderProps> = ({ eventData }) => {
	const dateApi = useDateFormatter(eventData.event.start_time);
	const locationApi = useLocation(eventData.event.location);
	const onPressLocation = () => locationApi.openMap(eventData.event.name);
	const { formattedDriveTime } = useDriveTime(eventData.event.location);

	const semanticTimeUntil = dateApi.getSemanticTimeUntil(); // ex: "Today", "Tomorrow", "This Thursday", "Next Friday", "In 2 weeks", "In 3 months", "In 2 years"
	const formattedStartDate = dayjs(eventData.event.start_time).format(
		'ddd. MMM D'
	); // ex: "Thu. Jan 1"

	const address = locationApi.build([
		{ type: 'street_number' },
		{ type: 'route', nameLength: 'short_name' }
	]);

	const locality = locationApi.build([
		{ type: 'neighborhood' },
		{ type: 'postal_code' }
	]);

	const country = locationApi.build([
		{ type: 'administrative_area_level_1' },
		{ type: 'country', nameLength: 'short_name' }
	]);

	return (
		<Section marginBottom='s'>
			<View flexDirection='row' justifyContent='space-between' marginBottom='m'>
				<View flex={1}>
					<If condition={dateApi.hasValidDate}>
						<Then>
							{dateApi.hasValidDate && semanticTimeUntil ? (
								<>
									<Text variant='paragraph-large-medium' marginBottom='xs'>
										{dateApi.getSemanticTimeUntil()}
									</Text>
									<Text variant='paragraph' color='text.t' marginBottom='xs'>
										{formattedStartDate}
									</Text>
								</>
							) : (
								<Text variant='paragraph-large-medium' marginBottom='xs'>
									{formattedStartDate}
								</Text>
							)}
							<Text variant='paragraph' color='text.t' marginBottom='xs'>
								{dayjs(eventData.event.start_time).format('h:mma')}
								{eventData.event.end_time &&
									dayjs(eventData.event.end_time).format(' - h:mma')}
							</Text>
						</Then>
						<Else>
							<Text variant='paragraph-medium' marginBottom='xs'>
								Unknown Date
							</Text>
						</Else>
					</If>
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
										{address}
									</Text>
									<Text
										variant='paragraph'
										color='text.t'
										marginBottom='xs'
										textAlign='right'
									>
										{locality}
									</Text>
									<Text variant='paragraph' color='text.t' textAlign='right'>
										{country}
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
