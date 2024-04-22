import {
	SheetApi,
	createUseContextHook,
	useNavigation,
	useSheet
} from '@hooks';
import { useRoute } from '@react-navigation/native';
import { EditVenuePageRouteProp, ProviderProps } from '@types';
import React, { createContext } from 'react';
import {
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	useForm
} from 'react-hook-form';
import { Alert } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { venueApiSlice } from 'src/redux/api/venue';
import { FindAllVenuesResponseDto } from 'src/redux/api/venue/dto/venue-find-all.dto';
import { UpdateVenueBodyDto } from 'src/redux/api/venue/dto/venue-update.dto';

const {
	useFindOneQuery: useFindOneVenueQuery,
	useUpdateMutation: useUpdateVenueMutation,
	useDeleteMutation: useDeleteVenueMutation
} = venueApiSlice;

const initialValues: UpdateVenueBodyDto = {
	name: '',
	latitude: 0,
	longitude: 0,
	street: '',
	city: '',
	state: '',
	postal_code: '',
	country: ''
};

export type EditVenuePageContextType = {
	formMethods: UseFormReturn<UpdateVenueBodyDto>;
	onSubmit: (e?: React.BaseSyntheticEvent<object, any, any>) => Promise<void>;
	loadForm: () => void;
	venueData: FindAllVenuesResponseDto;
	venueError: any;
	venueIsLoading: boolean;
	createLinkSheetApi: SheetApi;
	confirmDelete: () => void;
	changeVenueImage: (imagePickerAsset: Asset) => void;
};

export const EditVenuePageContext = createContext(
	{} as EditVenuePageContextType
);

export const EditVenuePageProvider: React.FC<ProviderProps> = ({
	children
}) => {
	const route = useRoute<EditVenuePageRouteProp>();

	const [editVenue] = useUpdateVenueMutation();
	const [deleteVenue] = useDeleteVenueMutation();

	const { back } = useNavigation();

	const {
		data: venueData,
		error: venueError,
		isLoading: venueIsLoading
	} = useFindOneVenueQuery({ params: { venue_id: route.params.venueId } });

	const formMethods = useForm<UpdateVenueBodyDto>({
		defaultValues: initialValues
	});

	const onValid: SubmitHandler<UpdateVenueBodyDto> = (
		data: UpdateVenueBodyDto
	) => {
		editVenue({
			params: { venue_id: route.params.venueId },
			body: {
				name: data.name,
				latitude: data.latitude,
				longitude: data.longitude,
				street: data.street,
				city: data.city,
				state: data.state,
				postal_code: data.postal_code,
				country: data.country
			}
		});
	};

	const onInvalid: SubmitErrorHandler<UpdateVenueBodyDto> = (errors: any) => {
		console.log('Invalid');
		console.log(errors);
	};

	const loadForm = () => {
		// TODO: EditVenue.context.tsx line 93 (add phone number and capacity)
		const phone_number = 6306668677;
		const capacity = 100;

		if (venueData) {
			// formMethods.reset({
			// 	name: venueData.name,
			// 	address: venueData.city || initialValues.name,
			// 	phone_number: venueData.postal_code
			// 		? Formatting.formatPhoneNumber(phone_number)
			// 		: initialValues.phone_number,
			// 	capacity: 100
			// 		? Formatting.formatCommaSeparatedNumber(capacity)
			// 		: initialValues.capacity
			// });
			formMethods.reset({
				name: venueData.name,
				latitude: venueData.latitude || initialValues.latitude,
				longitude: venueData.longitude || initialValues.longitude,
				street: venueData.street || initialValues.street,
				city: venueData.city || initialValues.city,
				state: venueData.state || initialValues.state,
				postal_code: venueData.postal_code || initialValues.postal_code,
				country: venueData.country || initialValues.country
			});
		}
	};

	const onSubmit = formMethods.handleSubmit(onValid, onInvalid);

	const createLinkSheetApi = useSheet();

	const confirmDelete = () => {
		Alert.alert(
			'Delete Venue',
			'Are you sure you want to delete this venue?',
			[
				{
					text: 'cancel',
					style: 'cancel'
				},
				{
					text: 'delete',
					onPress: onDeleteVenue,
					style: 'destructive'
				}
			],
			{ cancelable: false }
		);
	};

	const onDeleteVenue = () => {
		deleteVenue({ params: { venue_id: route.params.venueId } });
		back();
	};

	const changeVenueImage = (imagePickerAsset: Asset) => {
		if (
			imagePickerAsset.uri &&
			imagePickerAsset.type &&
			imagePickerAsset.fileName
		) {
			console.log('TODO: EditVenue.context.tsx line 162 (uploadVenueImage)');
			// uploadVenueImage(route.params.venueId, {
			// 	name: imagePickerAsset.fileName,
			// 	uri: imagePickerAsset.uri,
			// 	type: imagePickerAsset.type
			// });
		}
	};

	if (!venueData) {
		return <></>;
	}

	return (
		<EditVenuePageContext.Provider
			value={{
				formMethods,
				onSubmit,
				loadForm,
				venueData,
				venueError,
				venueIsLoading,
				createLinkSheetApi,
				confirmDelete,
				changeVenueImage
			}}
		>
			{children}
		</EditVenuePageContext.Provider>
	);
};

export const useEditVenuePageContext =
	createUseContextHook<EditVenuePageContextType>(
		EditVenuePageContext,
		'EditVenuePageContext'
	);
