import { useHostAppContext } from '@arch/Application/contexts/Host.context';
import { eventApiSlice } from '@flux/api/event';
import { FindAllEventsResponseDto } from '@flux/api/event/dto/event-find-all.dto';
import { SheetApi, useSheet } from '@hooks';

interface IUseEventManager {
	eventsData?: FindAllEventsResponseDto[];
	eventsError: any;
	eventsIsLoading: boolean;
	createEventStartSheetApi: SheetApi;
}

const useEventManager = (): IUseEventManager => {
	const { hostData } = useHostAppContext();
	const createEventStartSheetApi = useSheet();
	const {
		data: eventsData,
		error: eventsError,
		isLoading: eventsIsLoading
	} = eventApiSlice.useFindAllQuery({
		query: { page: 1, limit: 10, host_uid: hostData.host_uid }
	});

	return {
		eventsData,
		eventsError,
		eventsIsLoading,
		createEventStartSheetApi
	};
};

export default useEventManager;
