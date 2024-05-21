import { useHostAppContext } from '@arch/Application/contexts/Host.context';
import { Formatting } from '@etc';
import { contractApiSlice } from '@flux/api/contract';
import { CreateContractBodyDto } from '@flux/api/contract/dto/create-contract.dto';
import { UpdateContractBodyDto } from '@flux/api/contract/dto/update-contract.dto';
import {
	SequenceApi,
	SheetApi,
	TextInputApi,
	useSequence,
	useTextInput
} from '@hooks';
import { ApiIdentifier, OnSubmitHandler } from '@types';
import { useState } from 'react';
import {
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	useForm
} from 'react-hook-form';

const initialValues: UpdateContractBodyDto = {
	start_time: null,
	end_time: null,
	host_provides_equipment: false,
	additional_notes: null
};

interface IuseCreateContractBottomSheet {
	sheetApi: SheetApi;
	artistId: ApiIdentifier | null;
	eventId: ApiIdentifier;
	sequenceApi: SequenceApi;
	additionalNotesTextInputApi: TextInputApi;
	formMethods: UseFormReturn<UpdateContractBodyDto>;
	onSubmit: OnSubmitHandler;
	height: number;
	setHeight: React.Dispatch<React.SetStateAction<number>>;
	onChangeStartTime: (startTime: Date) => void;
	onChangeEndTime: (endTime: Date) => void;
}

const useCreateContractBottomSheet = (
	eventId: ApiIdentifier,
	artistId: ApiIdentifier | null,
	sheetApi: SheetApi
): IuseCreateContractBottomSheet => {
	const { hostData } = useHostAppContext();
	const sequenceApi = useSequence();
	const additionalNotesTextInputApi = useTextInput();
	const [height, setHeight] = useState<number>(0);
	const [createContractMutation] = contractApiSlice.useCreateMutation();

	const formMethods = useForm<UpdateContractBodyDto>({
		defaultValues: initialValues
	});

	const onValid: SubmitHandler<UpdateContractBodyDto> = async (
		data: UpdateContractBodyDto
	) => {
		if (artistId) {
			sequenceApi.next();
			data.start_time = Formatting.toUtcIsoFormat(data.start_time);
			data.end_time = Formatting.toUtcIsoFormat(data.end_time);
			const body: CreateContractBodyDto = {
				...data,
				host_id: hostData.host_id,
				artist_id: artistId,
				event_id: eventId
			};
			await createContractMutation({ body });
			sheetApi.close();
		}
	};

	const onInvalid: SubmitErrorHandler<CreateContractBodyDto> = (
		errors: any
	) => {
		console.log(errors);
	};

	const onSubmit = formMethods.handleSubmit(onValid, onInvalid);

	const onChangeStartTime = (startTime: Date) =>
		formMethods.setValue('start_time', Formatting.toUtcIsoFormat(startTime));
	const onChangeEndTime = (endTime: Date) =>
		formMethods.setValue('end_time', Formatting.toUtcIsoFormat(endTime));

	return {
		sheetApi,
		artistId,
		eventId,
		sequenceApi,
		additionalNotesTextInputApi,
		formMethods,
		onSubmit,
		height,
		setHeight,
		onChangeStartTime,
		onChangeEndTime
	};
};

export default useCreateContractBottomSheet;
