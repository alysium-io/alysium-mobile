import { MediaRefType } from '@flux/api/media/media.entity';
import { venueApiSlice } from '@flux/api/venue';
import { FindAllVenuesResponseDto } from '@flux/api/venue/dto/venue-find-all.dto';
import { UpdateVenueBodyDto } from '@flux/api/venue/dto/venue-update.dto';
import { VenueType } from '@flux/api/venue/types';
import {
	SheetApi,
	createUseContextHook,
	useMedia,
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

const initialValues: UpdateVenueBodyDto = {
	name: '',
	phone_number: '',
	capacity: 0,
	latitude: 0,
	longitude: 0,
	street: '',
	city: '',
	state: '',
	postal_code: '',
	country: '',
	description: '',
	venue_type: null
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
	setVenueProfileImage: (imagePickerAsset: Asset) => void;
	onChangeVenueType: (venueType: VenueType) => void;
};

export const EditVenuePageContext = createContext(
	{} as EditVenuePageContextType
);

export const EditVenuePageProvider: React.FC<ProviderProps> = ({
	children
}) => {
	const route = useRoute<EditVenuePageRouteProp>();
	const createLinkSheetApi = useSheet();
	const [editVenue] = venueApiSlice.useUpdateMutation();
	const [deleteVenue] = venueApiSlice.useDeleteMutation();
	const { uploadMedia } = useMedia();
	const { back } = useNavigation();

	const {
		data: venueData,
		error: venueError,
		isLoading: venueIsLoading
	} = venueApiSlice.useFindOneQuery({
		params: { venue_id: route.params.venueId }
	});

	const formMethods = useForm<UpdateVenueBodyDto>({
		defaultValues: initialValues
	});

	const onValid: SubmitHandler<UpdateVenueBodyDto> = (
		data: UpdateVenueBodyDto
	) => {
		console.log(data);
		editVenue({
			params: { venue_id: route.params.venueId },
			body: data
		});
	};

	const onInvalid: SubmitErrorHandler<UpdateVenueBodyDto> = (errors: any) => {
		console.log('Invalid');
		console.log(errors);
	};

	const loadForm = () => {
		if (venueData) {
			formMethods.reset({
				name: venueData.name,
				phone_number: venueData.phone_number ?? initialValues.phone_number,
				capacity: venueData.capacity ?? initialValues.capacity,
				latitude: venueData.latitude ?? initialValues.latitude,
				longitude: venueData.longitude ?? initialValues.longitude,
				street: venueData.street ?? initialValues.street,
				city: venueData.city ?? initialValues.city,
				state: venueData.state ?? initialValues.state,
				postal_code: venueData.postal_code ?? initialValues.postal_code,
				country: venueData.country ?? initialValues.country,
				description: venueData.description ?? initialValues.description,
				venue_type: venueData.venue_type ?? initialValues.venue_type
			});
		}
	};

	const onSubmit = formMethods.handleSubmit(onValid, onInvalid);

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

	const onChangeVenueType = (venueType: VenueType) => {
		formMethods.setValue('venue_type', venueType);
	};

	const setVenueProfileImage = (image: Asset) => {
		if (venueData) {
			uploadMedia(
				{
					ref: MediaRefType.venue,
					refId: venueData.venue_id,
					field: 'profile_image'
				},
				image
			);
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
				setVenueProfileImage,
				onChangeVenueType
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
