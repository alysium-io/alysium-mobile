import { Formatting } from '@etc';
import { eventApiSlice } from '@flux/api/event';
import { FindOneEventResponseDto } from '@flux/api/event/dto/event-find-one.dto';
import { venueApiSlice } from '@flux/api/venue';
import { FindAllVenuesResponseDto } from '@flux/api/venue/dto/venue-find-all.dto';
import {
	SheetApi,
	createUseContextHook,
	useNavigation,
	useSheet
} from '@hooks';
import { useRoute } from '@react-navigation/native';
import { ApiIdentifier, EditEventPageRouteProp, ProviderProps } from '@types';
import React, { createContext } from 'react';
import {
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	useForm
} from 'react-hook-form';
import { Alert } from 'react-native';
import { Asset } from 'react-native-image-picker';

type EditEventAttributes = {
	name: string;
	venue: ApiIdentifier | null;
	start_time: string | null;
	end_time: string | null;
	doors_open_time: string | null;
};

const initialValues: EditEventAttributes = {
	name: '',
	venue: null,
	start_time: null,
	end_time: null,
	doors_open_time: null
};

const { useFindOneQuery: useFindOneEventQuery } = eventApiSlice;
const { useFindAllQuery: useFindAllVenuesQuery } = venueApiSlice;

export type EditEventPageContextType = {
	eventId: ApiIdentifier;
	eventData: FindOneEventResponseDto;
	eventError: any;
	eventIsLoading: boolean;
	venuesData?: FindAllVenuesResponseDto[];
	venuesError: any;
	venuesIsLoading: boolean;
	formMethods: UseFormReturn<EditEventAttributes>;
	onSubmit: (e?: React.BaseSyntheticEvent<object, any, any>) => Promise<void>;
	loadForm: () => void;
	confirmDelete: () => void;
	createVenueSheetApi: SheetApi;
	onChangeVenue: (venueId: number) => void;
	goToEventCandidatesPage: () => void;
	changeEventImage: (imagePickerAsset: Asset) => void;
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
	const { back, eventCandidatesPage } = useNavigation();
	// const { editEvent, host, deleteEvent } = useHost();

	// const { uploadEventImage } = useImages();

	const route = useRoute<EditEventPageRouteProp>();

	const createVenueSheetApi = useSheet();

	const {
		data: eventData,
		error: eventError,
		isLoading: eventIsLoading
	} = useFindOneEventQuery({ params: { event_id: route.params.eventId } });

	const {
		data: venuesData,
		error: venuesError,
		isLoading: venuesIsLoading
	} = useFindAllVenuesQuery({ query: { page: 1, limit: 10 } });

	const formMethods = useForm<EditEventAttributes>({
		defaultValues: initialValues
	});

	const onValid: SubmitHandler<EditEventAttributes> = (
		data: EditEventAttributes
	) => {
		// editEvent(route.params.eventId, data);
		console.log('TODO: EditEventPageContext.tsx, line 97');
	};

	const onInvalid: SubmitErrorHandler<EditEventAttributes> = (errors: any) => {
		console.log(errors);
	};

	const loadForm = () => {
		if (eventData) {
			formMethods.reset({
				// name: eventData.data.attributes.name,
				// venue: eventData.data.attributes.venue?.data?.id ?? null,
				// start_time: eventData.data.attributes.start_time ?? null,
				// end_time: eventData.data.attributes.end_time ?? null,
				// doors_open_time:
				// 	eventData.data.attributes.doors_open_time ?? null
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
		// deleteEvent(route.params.eventId);
		console.log('TODO: EditEventPageContext.tsx, line 142');
		back();
	};

	const onChangeVenue = (venueId: ApiIdentifier) =>
		formMethods.setValue('venue', venueId);
	const onChangeStartTime = (startTime: Date) =>
		formMethods.setValue(
			'start_time',
			Formatting.formatJsDateForPostgresTimestamp(startTime)
		);
	const onChangeEndTime = (endTime: Date) =>
		formMethods.setValue(
			'end_time',
			Formatting.formatJsDateForPostgresTimestamp(endTime)
		);
	const onChangeDoorsOpenTime = (doorsOpenTime: Date) =>
		formMethods.setValue(
			'doors_open_time',
			Formatting.formatJsDateForPostgresTimestamp(doorsOpenTime)
		);

	const goToEventCandidatesPage = () => {
		eventCandidatesPage(route.params.eventId);
	};

	const changeEventImage = (imagePickerAsset: Asset) => {
		if (
			imagePickerAsset.uri &&
			imagePickerAsset.type &&
			imagePickerAsset.fileName
		) {
			// uploadEventImage(route.params.eventId, {
			// 	name: imagePickerAsset.fileName,
			// 	uri: imagePickerAsset.uri,
			// 	type: imagePickerAsset.type
			// });
			console.log('TODO: EditEventPageContext.tsx, line 177');
		}
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
				onSubmit,
				loadForm,
				confirmDelete,
				createVenueSheetApi,
				onChangeVenue,
				goToEventCandidatesPage,
				changeEventImage,
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
