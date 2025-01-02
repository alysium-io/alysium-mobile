import { eventApiSlice } from '@flux/api/event';
import { NearbyEventsResponseDto } from '@flux/api/event/dto/event-nearby.dto';
import { useCurrentLocationContext } from '@src/utils/contexts';

const SEARCH_RADIUS = 50; // in kilometers

interface IUseSearchNearbyEvents {
	data?: NearbyEventsResponseDto;
}

const useSearchNearbyEvents = (): IUseSearchNearbyEvents => {
	const { currentLocation, hasLocation } = useCurrentLocationContext();

	const getQuery = () => {
		if (hasLocation) {
			return {
				latitude: currentLocation?.latitude,
				longitude: currentLocation?.longitude,
				radius: SEARCH_RADIUS
			};
		} else {
			return {};
		}
	};

	const { data } = eventApiSlice.useNearbyEventsQuery({
		query: getQuery()
	});

	return {
		data
	};
};

export default useSearchNearbyEvents;
