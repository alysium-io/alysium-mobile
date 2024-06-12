import { MediaRefType } from '@flux/api/media/media.entity';
import { venueApiSlice } from '@flux/api/venue';
import { FindAllVenuesResponseDto } from '@flux/api/venue/dto/venue-find-all.dto';
import { UpdateVenueBodyDto } from '@flux/api/venue/dto/venue-update.dto';
import { VenueType } from '@flux/api/venue/types';
import {
	SheetApi,
	TextInputApi,
	useMedia,
	useNavigation,
	useSheet,
	useTextInput
} from '@hooks';
import { ApiIdentifier, OnSubmitHandler } from '@types';
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

interface IUseEditVenuePage {
	venueData?: FindAllVenuesResponseDto;
	venueError: any;
	venueIsLoading: boolean;
	formMethods: UseFormReturn<UpdateVenueBodyDto>;
	onSubmit: OnSubmitHandler;
	loadForm: () => void;
	createLinkSheetApi: SheetApi;
	confirmDelete: () => void;
	setVenueProfileImage: (imagePickerAsset: Asset) => void;
	onChangeVenueType: (venueType: VenueType) => void;
	descriptionTextInputApi: TextInputApi;
	streetAddressTextInputApi: TextInputApi;
	phoneNumberTextInputApi: TextInputApi;
	capacityTextInputApi: TextInputApi;
}

const useEditVenuePage = (venue_uid: ApiIdentifier): IUseEditVenuePage => {
	const createLinkSheetApi = useSheet();
	const descriptionTextInputApi = useTextInput();
	const streetAddressTextInputApi = useTextInput();
	const phoneNumberTextInputApi = useTextInput();
	const capacityTextInputApi = useTextInput();
	const [editVenue] = venueApiSlice.useUpdateMutation();
	const [deleteVenue] = venueApiSlice.useDeleteMutation();
	const { uploadMedia } = useMedia();
	const { back } = useNavigation();

	const {
		data: venueData,
		error: venueError,
		isLoading: venueIsLoading
	} = venueApiSlice.useFindOneQuery({
		params: { venue_uid: venue_uid }
	});

	const formMethods = useForm<UpdateVenueBodyDto>({
		defaultValues: initialValues
	});

	const onValid: SubmitHandler<UpdateVenueBodyDto> = (
		data: UpdateVenueBodyDto
	) => {
		console.log(data);
		editVenue({
			params: { venue_uid: venue_uid },
			body: data
		});
	};

	const onInvalid: SubmitErrorHandler<UpdateVenueBodyDto> = (errors: any) => {
		console.log('Invalid: ', errors);
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
		deleteVenue({ params: { venue_uid: venue_uid } });
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
					refId: venueData.venue_uid,
					field: 'profile_image'
				},
				image
			);
		}
	};

	return {
		venueData,
		venueError,
		venueIsLoading,
		formMethods,
		onSubmit,
		loadForm,
		createLinkSheetApi,
		confirmDelete,
		setVenueProfileImage,
		onChangeVenueType,
		descriptionTextInputApi,
		streetAddressTextInputApi,
		phoneNumberTextInputApi,
		capacityTextInputApi
	};
};

export default useEditVenuePage;
