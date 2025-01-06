import { eventApiSlice } from '@flux/api/event';
import { NearbyEventsResponseDto } from '@flux/api/event/dto/event-nearby.dto';
import { useCurrentLocationContext } from '@src/utils/contexts';

const SEARCH_RADIUS = 50;

interface IUseSearchNearbyEvents {
	data?: NearbyEventsResponseDto;
	error?: unknown;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	isFetching: boolean;
	refetch: () => void;
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

	return eventApiSlice.useNearbyEventsQuery({
		query: getQuery()
	});
};

export default useSearchNearbyEvents;
