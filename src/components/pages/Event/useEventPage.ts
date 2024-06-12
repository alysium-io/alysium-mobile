import { eventApiSlice } from '@flux/api/event';
import { FindOneEventResponseDto } from '@flux/api/event/dto/event-find-one.dto';
import { ApiIdentifier } from '@types';

interface IUseEventPage {
	eventData?: FindOneEventResponseDto;
	eventError: any;
	eventIsLoading: boolean;
}

const useEventPage = (event_uid: ApiIdentifier): IUseEventPage => {
	const {
		data: eventData,
		error: eventError,
		isLoading: eventIsLoading
	} = eventApiSlice.useFindOneQuery({
		params: { event_uid: event_uid }
	});

	return {
		eventData,
		eventError,
		eventIsLoading
	};
};

export default useEventPage;
