import { useHostAppContext } from '@arch/Application/contexts/Host.context';
import { Formatting } from '@etc';
import { contractApiSlice } from '@flux/api/contract';
import { CreateContractBodyDto } from '@flux/api/contract/dto/create-contract.dto';
import { UpdateContractBodyDto } from '@flux/api/contract/dto/update-contract.dto';
import { SheetApi, TextInputApi, useTextInput } from '@hooks';
import { SequenceApi, useSequence } from '@organisms';
import { ApiIdentifier, OnSubmitHandler } from '@types';
import {
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	useForm
} from 'react-hook-form';
import { Keyboard } from 'react-native';

const initialValues: UpdateContractBodyDto = {
	start_time: null,
	end_time: null,
	host_provides_equipment: false,
	additional_notes: null
};

interface IuseCreateContractBottomSheet {
	sheetApi: SheetApi;
	artist_uid: ApiIdentifier | null;
	event_uid: ApiIdentifier;
	sequenceApi: SequenceApi;
	additionalNotesTextInputApi: TextInputApi;
	formMethods: UseFormReturn<UpdateContractBodyDto>;
	onSubmit: OnSubmitHandler;
	onChangeStartTime: (startTime: Date) => void;
	onChangeEndTime: (endTime: Date) => void;
	done: () => void;
	cancel: () => void;
	resetAll: () => void;
}

const useCreateContractBottomSheet = (
	event_uid: ApiIdentifier,
	artist_uid: ApiIdentifier | null,
	sheetApi: SheetApi
): IuseCreateContractBottomSheet => {
	const { hostData } = useHostAppContext();
	const sequenceApi = useSequence(4);
	const additionalNotesTextInputApi = useTextInput();
	const [createContractMutation] = contractApiSlice.useCreateMutation();

	const formMethods = useForm<UpdateContractBodyDto>({
		defaultValues: initialValues
	});

	const resetAll = () => {
		Keyboard.dismiss();
		additionalNotesTextInputApi.reset();
		sequenceApi.reset();
		formMethods.reset();
	};

	const onValid: SubmitHandler<UpdateContractBodyDto> = async (
		data: UpdateContractBodyDto
	) => {
		if (artist_uid) {
			data.start_time = Formatting.toUtcIsoFormat(data.start_time);
			data.end_time = Formatting.toUtcIsoFormat(data.end_time);
			const body: CreateContractBodyDto = {
				...data,
				host_uid: hostData.host_uid,
				artist_uid: artist_uid,
				event_uid: event_uid
			};
			await createContractMutation({ body });
			sheetApi.close();
			sequenceApi.reset();
		}
	};

	const onInvalid: SubmitErrorHandler<CreateContractBodyDto> = (
		errors: any
	) => {
		console.log(errors);
		sequenceApi.reset();
	};

	const onSubmit = formMethods.handleSubmit(onValid, onInvalid);

	const done = () => {
		sheetApi.close();
		onSubmit();
	};

	const cancel = () => {
		sheetApi.close();
	};

	const onChangeStartTime = (startTime: Date) =>
		formMethods.setValue('start_time', Formatting.toUtcIsoFormat(startTime));
	const onChangeEndTime = (endTime: Date) =>
		formMethods.setValue('end_time', Formatting.toUtcIsoFormat(endTime));

	return {
		sheetApi,
		artist_uid,
		event_uid,
		sequenceApi,
		additionalNotesTextInputApi,
		formMethods,
		onSubmit,
		onChangeStartTime,
		onChangeEndTime,
		done,
		cancel,
		resetAll
	};
};

export default useCreateContractBottomSheet;
