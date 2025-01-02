import { View } from '@atomic';
import { useNavigation, useSearchNearbyEvents, useTheme } from '@hooks';
import { ActionButtons, Location } from '@molecules';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LocalEventsMap = () => {
	const { back } = useNavigation();
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	const { data } = useSearchNearbyEvents();

	const markers =
		data?.map((event) => ({
			location: event.event.location,
			label: event.event.name,
			color: 'blue'
		})) || [];

	return (
		<View flex={1}>
			<Location
				markers={markers}
				mapViewProps={{
					zoomEnabled: true,
					scrollEnabled: true,
					rotateEnabled: true,
					pitchEnabled: true,
					zoomTapEnabled: true,
					zoomControlEnabled: true,
					moveOnMarkerPress: false,
					loadingEnabled: true,
					toolbarEnabled: false,
					showsCompass: false,
					showsMyLocationButton: true,
					showsUserLocation: true
				}}
			/>
			<View
				backgroundColor='bg.light'
				borderTopWidth={theme.borderWidth.normal}
				borderTopColor='border.medium'
				width='100%'
				zIndex={999}
				position='absolute'
				bottom={0}
				padding='m'
				style={{
					paddingBottom: insets.bottom + theme.spacing.m
				}}
			>
				<ActionButtons
					buttonProps={{
						text: 'Dismiss',
						onPress: back,
						containerProps: {
							backgroundColor: 'bg.p'
						}
					}}
				/>
			</View>
		</View>
	);
};

export default LocalEventsMap;
