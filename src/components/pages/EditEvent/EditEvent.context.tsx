import { useHostAppContext } from '@arch/Application/contexts/Host.context';
import { Formatting } from '@etc';
import { eventApiSlice } from '@flux/api/event';
import { FindOneEventResponseDto } from '@flux/api/event/dto/event-find-one.dto';
import { UpdateEventBodyDto } from '@flux/api/event/dto/event-update.dto';
import { MediaRefType } from '@flux/api/media/media.entity';
import { venueApiSlice } from '@flux/api/venue';
import { FindAllVenuesResponseDto } from '@flux/api/venue/dto/venue-find-all.dto';
import {
	SheetApi,
	createUseContextHook,
	useMedia,
	useNavigation,
	useSheet
} from '@hooks';
import { useRoute } from '@react-navigation/native';
import { ApiIdentifier, EditEventPageRouteProp, ProviderProps } from '@types';
import React, { createContext, useEffect } from 'react';
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

export type EditEventPageContextType = {
	eventId: ApiIdentifier;
	eventData: FindOneEventResponseDto;
	eventError: any;
	eventIsLoading: boolean;
	venuesData?: FindAllVenuesResponseDto[];
	venuesError: any;
	venuesIsLoading: boolean;
	formMethods: UseFormReturn<UpdateEventBodyDto>;
	createVenueSheetApi: SheetApi;
	createVenue: (name: string) => void;
	onSubmit: (e?: React.BaseSyntheticEvent<object, any, any>) => Promise<void>;
	loadForm: () => void;
	confirmDelete: () => void;
	setEventProfileImage: (image: Asset) => void;
	onChangeVenue: (venueId: number) => void;
	goToEventCandidatesPage: () => void;
	onChangeStartTime: (startTime: Date) => void;
	onChangeEndTime: (endTime: Date) => void;
	onChangeDoorsOpenTime: (doorsOpenTime: Date) => void;
};

export const EditEventPageContext = createContext(
	{} as EditEventPageContextType
);

export const EditEventPageProvider: React.FC<ProviderProps> = ({
	children
}) => {
	/**
	 * Config
	 */
	const route = useRoute<EditEventPageRouteProp>();
	const createVenueSheetApi = useSheet();
	const { uploadMedia } = useMedia();
	const { back, eventCandidatesPage } = useNavigation();
	const { hostData } = useHostAppContext();
	const [updateEventMutation] = eventApiSlice.useUpdateMutation();
	const [deleteEventMutation] = eventApiSlice.useDeleteMutation();
	const [createVenueMutation] = venueApiSlice.useCreateMutation();
	const [updateEventVenueMutation] = eventApiSlice.useUpdateVenueMutation();

	const {
		data: eventData,
		error: eventError,
		isLoading: eventIsLoading
	} = eventApiSlice.useFindOneQuery({
		params: { event_id: route.params.eventId }
	});

	const {
		data: venuesData,
		error: venuesError,
		isLoading: venuesIsLoading
	} = venueApiSlice.useFindAllQuery({
		query: {
			host_id: hostData.host_id,
			page: 1,
			limit: 10
		}
	});

	useEffect(() => {
		loadForm();
	}, [eventData]);

	/**
	 * Form actions
	 */
	const formMethods = useForm<UpdateEventBodyDto>({
		defaultValues: initialValues
	});

	const onValid: SubmitHandler<UpdateEventBodyDto> = (
		data: UpdateEventBodyDto
	) => {
		updateEventMutation({
			body: data,
			params: { event_id: route.params.eventId }
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

	const onSubmit = formMethods.handleSubmit(onValid, onInvalid);

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

	const onDeleteEvent = () => {
		deleteEventMutation({ params: { event_id: route.params.eventId } });
		back();
	};

	/**
	 * OnChange form actions
	 * (Mostly just preprocessing)
	 */
	const onChangeVenue = (venueId: ApiIdentifier) => {
		if (eventData) {
			updateEventVenueMutation({
				params: { event_id: eventData.event_id },
				body: { venue_id: venueId }
			});
		}
	};

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
					refId: eventData.event_id,
					field: 'profile_image'
				},
				image
			);
		}
	};

	/**
	 * Etc
	 */
	const goToEventCandidatesPage = () => {
		eventCandidatesPage(route.params.eventId);
	};

	const createVenue = (name: string) => {
		createVenueMutation({
			body: { name, host_id: hostData.host_id }
		});
	};

	if (!eventData) {
		return <></>;
	}

	return (
		<EditEventPageContext.Provider
			value={{
				eventId: route.params.eventId,
				eventData,
				eventError,
				eventIsLoading,
				venuesData,
				venuesError,
				venuesIsLoading,
				formMethods,
				createVenueSheetApi,
				createVenue,
				onSubmit,
				loadForm,
				confirmDelete,
				onChangeVenue,
				goToEventCandidatesPage,
				setEventProfileImage,
				onChangeStartTime,
				onChangeEndTime,
				onChangeDoorsOpenTime
			}}
		>
			{children}
		</EditEventPageContext.Provider>
	);
};

export const useEditEventPageContext =
	createUseContextHook<EditEventPageContextType>(
		EditEventPageContext,
		'EditEventPageContext'
	);
