import { Section, Text, View } from '@atomic';
import { FindOneEventResponseDto } from '@flux/api/event/dto/event-find-one.dto';
import { useDateFormatter, useLocation } from '@hooks';
import day from 'dayjs';
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
					<If condition={eventData.event.start_time}>
						<Then>
							<Text variant='paragraph-medium' marginBottom='xs'>
								{day(eventData.event.start_time).format('ddd. MMM D')}
							</Text>
							{dateApi.hasValidDate && (
								<Text
									variant='paragraph-small'
									color='text.t'
									marginBottom='xs'
								>
									{dateApi.getSemanticTimeUntil()}
								</Text>
							)}
							<Text variant='paragraph-small' color='text.t' marginBottom='xs'>
								{day(eventData.event.start_time).format('h:mma')}
								{eventData.event.end_time &&
									day(eventData.event.end_time).format(' - h:mma')}
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
									<Text
										variant='paragraph-medium'
										marginBottom='xs'
										textAlign='right'
									>
										{address}
									</Text>
									<Text
										variant='paragraph-small'
										color='text.t'
										marginBottom='xs'
										textAlign='right'
									>
										{locality}
									</Text>
									<Text
										variant='paragraph-small'
										color='text.t'
										textAlign='right'
									>
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
