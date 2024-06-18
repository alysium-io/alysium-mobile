import { Formatting } from '@etc';
import { ticketTypeApiSlice } from '@flux/api/ticket-type';
import { FindOneTicketTypeResponseDto } from '@flux/api/ticket-type/dto/ticket-type-find-one.dto';
import { UpdateTicketTypeBodyDto } from '@flux/api/ticket-type/dto/ticket-type-update.dto';
import {
	SheetApi,
	TextInputApi,
	useNavigation,
	useSheet,
	useTextInput
} from '@hooks';
import { ApiIdentifier } from '@types';
import {
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	useForm
} from 'react-hook-form';
import { Alert } from 'react-native';

const initialValues: UpdateTicketTypeBodyDto = {
	name: '',
	num_available: null,
	price: null,
	sale_start_time: null,
	sale_end_time: null
};

interface IUseEditTicketType {
	ticketTypeData?: FindOneTicketTypeResponseDto;
	ticketTypeError?: any;
	ticketTypeIsLoading: boolean;
	confirmDelete: () => void;
	formMethods: UseFormReturn<UpdateTicketTypeBodyDto>;
	loadForm: () => void;
	onSubmit: () => Promise<void>;
	onChangeStartSaleTime: (startSaleTime: Date | null) => void;
	onChangeEndSaleTime: (endSaleTime: Date | null) => void;
	resetAll: () => void;
	numberOfTicketsTextInputApi: TextInputApi;
	ticketPriceTextInputApi: TextInputApi;
	ticketTypeNameTextInputApi: TextInputApi;
	editTicketTypeOnSaleSheetApi: SheetApi;
	editTicketTypeEndSaleSheetApi: SheetApi;
}

const useEditTicketTypePage = (
	ticket_collection_uid: ApiIdentifier,
	ticket_type_uid: ApiIdentifier
): IUseEditTicketType => {
	const { back } = useNavigation();
	const [deleteTicketTypeMutation] = ticketTypeApiSlice.useDeleteMutation();
	const [updateTicketTypeMutation] = ticketTypeApiSlice.useUpdateMutation();
	const ticketTypeNameTextInputApi = useTextInput();
	const numberOfTicketsTextInputApi = useTextInput();
	const ticketPriceTextInputApi = useTextInput();
	const editTicketTypeOnSaleSheetApi = useSheet();
	const editTicketTypeEndSaleSheetApi = useSheet();

	const {
		data: ticketTypeData,
		error: ticketTypeError,
		isLoading: ticketTypeIsLoading
	} = ticketTypeApiSlice.useFindOneQuery({
		params: { ticket_type_uid },
		query: { ticket_collection_uid }
	});

	const loadForm = () => {
		if (ticketTypeData) {
			formMethods.reset({
				name: ticketTypeData.name,
				num_available: ticketTypeData.num_available,
				price: ticketTypeData.price,
				sale_start_time: Formatting.toUtcIsoFormat(
					ticketTypeData.sale_start_time
				),
				sale_end_time: Formatting.toUtcIsoFormat(ticketTypeData.sale_end_time)
			});
		}
	};

	const resetAll = () => {
		ticketTypeNameTextInputApi.reset();
		numberOfTicketsTextInputApi.reset();
		ticketPriceTextInputApi.reset();
		formMethods.reset();
	};

	const formMethods = useForm<UpdateTicketTypeBodyDto>({
		defaultValues: initialValues
	});

	const onValid: SubmitHandler<UpdateTicketTypeBodyDto> = async (
		data: UpdateTicketTypeBodyDto
	) => {
		updateTicketTypeMutation({
			body: data,
			params: { ticket_type_uid },
			query: { ticket_collection_uid }
		});
	};

	const onInvalid: SubmitErrorHandler<UpdateTicketTypeBodyDto> = (
		errors: any
	) => {
		console.log(errors);
	};

	const onSubmit = formMethods.handleSubmit(onValid, onInvalid);

	const onChangeStartSaleTime = (startSaleTime: Date | null) => {
		formMethods.setValue(
			'sale_start_time',
			Formatting.toUtcIsoFormat(startSaleTime)
		);
		onSubmit();
	};

	const onChangeEndSaleTime = (endSaleTime: Date | null) => {
		formMethods.setValue(
			'sale_end_time',
			Formatting.toUtcIsoFormat(endSaleTime)
		);
		onSubmit();
	};

	const confirmDelete = () => {
		Alert.alert(
			'Delete Ticket Type',
			'Are you sure you want to delete this Ticket Type?',
			[
				{
					text: 'cancel',
					style: 'cancel'
				},
				{
					text: 'delete',
					onPress: onDeleteTicketType,
					style: 'destructive'
				}
			],
			{ cancelable: false }
		);
	};

	const onDeleteTicketType = () => {
		deleteTicketTypeMutation({
			params: { ticket_type_uid },
			query: { ticket_collection_uid }
		});
		back();
	};

	return {
		ticketTypeData,
		ticketTypeError,
		ticketTypeIsLoading,
		confirmDelete,
		formMethods,
		loadForm,
		onSubmit,
		onChangeStartSaleTime,
		onChangeEndSaleTime,
		resetAll,
		numberOfTicketsTextInputApi,
		ticketPriceTextInputApi,
		ticketTypeNameTextInputApi,
		editTicketTypeOnSaleSheetApi,
		editTicketTypeEndSaleSheetApi
	};
};

export default useEditTicketTypePage;
