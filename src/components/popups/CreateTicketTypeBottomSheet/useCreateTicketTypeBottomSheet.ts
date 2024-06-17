import { Formatting } from '@etc';
import { ticketTypeApiSlice } from '@flux/api/ticket-type';
import { CreateTicketTypeBodyDto } from '@flux/api/ticket-type/dto/ticket-type-create.dto';
import { SheetApi, TextInputApi, useTextInput } from '@hooks';
import { SequenceApi, useSequence } from '@organisms';
import { ApiIdentifier, OnSubmitHandler } from '@types';
import { useState } from 'react';
import {
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	useForm
} from 'react-hook-form';

const initialValues: CreateTicketTypeBodyDto = {
	ticket_collection_uid: '',
	num_available: null,
	price: null,
	name: '',
	sale_start_time: null,
	sale_end_time: null
};

interface IUseCreateTicketTypeBottomSheet {
	sequenceApi: SequenceApi;
	resetAll: () => void;
	onSubmit: OnSubmitHandler;
	formMethods: UseFormReturn<CreateTicketTypeBodyDto>;
	ticketTypeNameTextInputApi: TextInputApi;
	numberOfTicketsTextInputApi: TextInputApi;
	ticketPriceTextInputApi: TextInputApi;
	title: string;
	setTitle: (title: string) => void;
	onChangeStartSaleTime: (startSaleTime: Date) => void;
	onChangeEndSaleTime: (endSaleTime: Date) => void;
	done: () => Promise<void>;
	cancel: () => void;
	onSheetIndexChangeFocusTextInput: (index: number) => void;
}

const useCreateTicketTypeBottomSheet = (
	sheetApi: SheetApi,
	ticket_collection_uid: ApiIdentifier
): IUseCreateTicketTypeBottomSheet => {
	const sequenceApi = useSequence(6);
	const ticketTypeNameTextInputApi = useTextInput();
	const numberOfTicketsTextInputApi = useTextInput();
	const ticketPriceTextInputApi = useTextInput();
	const [createTicketTypeMutation] = ticketTypeApiSlice.useCreateMutation();
	const [title, setTitle] = useState<string>('New Ticket');

	const resetAll = () => {
		ticketTypeNameTextInputApi.reset();
		numberOfTicketsTextInputApi.reset();
		ticketPriceTextInputApi.reset();
		formMethods.reset();
		setTitle('New Ticket');
		sequenceApi.reset();
	};

	const formMethods = useForm<CreateTicketTypeBodyDto>({
		defaultValues: initialValues
	});

	const onValid: SubmitHandler<CreateTicketTypeBodyDto> = async (
		data: CreateTicketTypeBodyDto
	) => {
		data.ticket_collection_uid = ticket_collection_uid;
		await createTicketTypeMutation({ body: data });
	};

	const onInvalid: SubmitErrorHandler<CreateTicketTypeBodyDto> = (
		errors: any
	) => {
		console.log(errors);
	};

	const onSubmit = formMethods.handleSubmit(onValid, onInvalid);

	const onChangeStartSaleTime = (startSaleTime: Date) =>
		formMethods.setValue(
			'sale_start_time',
			Formatting.toUtcIsoFormat(startSaleTime)
		);
	const onChangeEndSaleTime = (endSaleTime: Date) =>
		formMethods.setValue(
			'sale_end_time',
			Formatting.toUtcIsoFormat(endSaleTime)
		);

	const done = async () => {
		onSubmit();
		sheetApi.close();
	};

	const cancel = () => {
		sheetApi.close();
	};

	const onSheetIndexChangeFocusTextInput = (index: number) => {
		if (index === 0) {
			ticketTypeNameTextInputApi.focus();
		}
	};

	return {
		sequenceApi,
		resetAll,
		onSubmit,
		formMethods,
		ticketTypeNameTextInputApi,
		numberOfTicketsTextInputApi,
		ticketPriceTextInputApi,
		title,
		setTitle,
		onChangeStartSaleTime,
		onChangeEndSaleTime,
		done,
		cancel,
		onSheetIndexChangeFocusTextInput
	};
};

export default useCreateTicketTypeBottomSheet;
