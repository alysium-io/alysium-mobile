import { useHostAppContext } from '@arch/Application/contexts/Host.context';
import { Formatting } from '@etc';
import { eventApiSlice } from '@flux/api/event';
import { FindOneEventResponseDto } from '@flux/api/event/dto/event-find-one.dto';
import { UpdateEventBodyDto } from '@flux/api/event/dto/event-update.dto';
import { MediaRefType } from '@flux/api/media/media.entity';
import { venueApiSlice } from '@flux/api/venue';
import { FindAllVenuesResponseDto } from '@flux/api/venue/dto/venue-find-all.dto';
import { SheetApi, useMedia, useNavigation, useSheet } from '@hooks';
import { ApiIdentifier, OnSubmitHandler } from '@types';
import {
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	useForm
} from 'react-hook-form';
import { Alert } from 'react-native';
import { Asset } from 'react-native-image-picker';

const initialValues: UpdateEventBodyDto = {
	name: '',
	start_time: null,
	end_time: null,
	doors_open_time: null,
	serves_alcohol: false,
	serves_food_and_drink: false,
	has_security: false,
	pets_allowed: false
};

interface IUseEditEvent {
	eventData?: FindOneEventResponseDto;
	eventError: any;
	eventIsLoading: boolean;
	venuesData?: FindAllVenuesResponseDto[];
	venuesError: any;
	venuesIsLoading: boolean;
	formMethods: UseFormReturn<UpdateEventBodyDto>;
	createVenueSheetApi: SheetApi;
	onSubmit: OnSubmitHandler;
	loadForm: () => void;
	onDeleteEvent: () => void;
	setEventProfileImage: (image: Asset) => void;
	onChangeVenue: (venue_uid: ApiIdentifier) => void;
	onChangeStartTime: (startTime: Date) => void;
	onChangeEndTime: (endTime: Date) => void;
	onChangeDoorsOpenTime: (doorsOpenTime: Date) => void;
	goToEventCandidatesPage: () => void;
	confirmDelete: () => void;
	goToEditEventTicketTypesPage: () => void;
}

const useEditEventPage = (event_uid: ApiIdentifier): IUseEditEvent => {
	const { back, eventCandidatesPage, editEventTicketTypesPage } =
		useNavigation();
	const { hostData } = useHostAppContext();
	const { uploadMedia } = useMedia();
	const [deleteEventMutation] = eventApiSlice.useDeleteMutation();
	const [updateEventMutation] = eventApiSlice.useUpdateMutation();
	const [updateEventVenueMutation] = eventApiSlice.useUpdateVenueMutation();
	const createVenueSheetApi = useSheet();

	const {
		data: eventData,
		error: eventError,
		isLoading: eventIsLoading
	} = eventApiSlice.useFindOneQuery({
		params: { event_uid }
	});

	const {
		data: venuesData,
		error: venuesError,
		isLoading: venuesIsLoading
	} = venueApiSlice.useFindAllQuery({
		query: {
			host_uid: hostData.host_uid,
			page: 1,
			limit: 10
		}
	});

	const formMethods = useForm<UpdateEventBodyDto>({
		defaultValues: initialValues
	});

	const onValid: SubmitHandler<UpdateEventBodyDto> = (
		data: UpdateEventBodyDto
	) => {
		updateEventMutation({
			body: data,
			params: { event_uid }
		});
	};

	const onInvalid: SubmitErrorHandler<UpdateEventBodyDto> = (errors: any) => {
		console.log(errors);
	};

	const loadForm = () => {
		if (eventData) {
			formMethods.reset({
				name: eventData.name ?? initialValues.name,
				start_time: eventData.start_time ?? initialValues.start_time,
				end_time: eventData.end_time ?? initialValues.end_time,
				doors_open_time:
					eventData.doors_open_time ?? initialValues.doors_open_time,
				serves_alcohol:
					eventData.serves_alcohol ?? initialValues.serves_alcohol,
				serves_food_and_drink:
					eventData.serves_food_and_drink ??
					initialValues.serves_food_and_drink,
				has_security: eventData.has_security ?? initialValues.has_security,
				pets_allowed: eventData.pets_allowed ?? initialValues.pets_allowed
			});
		}
	};

	const confirmDelete = () => {
		Alert.alert(
			'Delete Event',
			'Are you sure you want to delete this event?',
			[
				{
					text: 'cancel',
					style: 'cancel'
				},
				{
					text: 'delete',
					onPress: onDeleteEvent,
					style: 'destructive'
				}
			],
			{ cancelable: false }
		);
	};

	const onSubmit = formMethods.handleSubmit(onValid, onInvalid);

	const onChangeStartTime = (startTime: Date) =>
		formMethods.setValue('start_time', Formatting.toUtcIsoFormat(startTime));
	const onChangeEndTime = (endTime: Date) =>
		formMethods.setValue('end_time', Formatting.toUtcIsoFormat(endTime));
	const onChangeDoorsOpenTime = (doorsOpenTime: Date) =>
		formMethods.setValue(
			'doors_open_time',
			Formatting.toUtcIsoFormat(doorsOpenTime)
		);

	const setEventProfileImage = (image: Asset) => {
		if (eventData) {
			uploadMedia(
				{
					ref: MediaRefType.event,
					refId: eventData.event_uid,
					field: 'profile_image'
				},
				image
			);
		}
	};

	const onChangeVenue = (venue_uid: ApiIdentifier) => {
		if (eventData) {
			updateEventVenueMutation({
				params: { event_uid: eventData.event_uid },
				body: { venue_uid }
			});
		}
	};

	const onDeleteEvent = () => {
		deleteEventMutation({ params: { event_uid } });
		back();
	};

	const goToEventCandidatesPage = () => {
		eventCandidatesPage(event_uid);
	};

	const goToEditEventTicketTypesPage = () => {
		editEventTicketTypesPage(event_uid);
	};

	return {
		eventData,
		eventError,
		eventIsLoading,
		venuesData,
		venuesError,
		venuesIsLoading,
		formMethods,
		createVenueSheetApi,
		onSubmit,
		loadForm,
		onDeleteEvent,
		setEventProfileImage,
		onChangeVenue,
		onChangeStartTime,
		onChangeEndTime,
		onChangeDoorsOpenTime,
		goToEventCandidatesPage,
		confirmDelete,
		goToEditEventTicketTypesPage
	};
};

export default useEditEventPage;
