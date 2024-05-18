import { useHostAppContext } from '@arch/Application/contexts/Host.context';
import { Formatting } from '@etc';
import { contractApiSlice } from '@flux/api/contract';
import { CreateContractBodyDto } from '@flux/api/contract/dto/create-contract.dto';
import { UpdateContractBodyDto } from '@flux/api/contract/dto/update-contract.dto';
import {
	SequenceApi,
	SheetApi,
	createUseContextHook,
	useSequence
} from '@hooks';
import { ApiIdentifier, ProviderProps } from '@types';
import React, { createContext, useState } from 'react';
import {
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	useForm
} from 'react-hook-form';

export interface CreateContractBottomSheetProviderProps extends ProviderProps {
	sheetApi: SheetApi;
	artistId: ApiIdentifier | null;
	eventId: ApiIdentifier;
}

export type CreateContractBottomSheetContextType = {
	sheetApi: SheetApi;
	artistId: ApiIdentifier;
	eventId: ApiIdentifier;
	sequenceApi: SequenceApi;
	formMethods: UseFormReturn<UpdateContractBodyDto>;
	onSubmit: (e?: React.BaseSyntheticEvent<object, any, any>) => Promise<void>;
	height: number;
	setHeight: React.Dispatch<React.SetStateAction<number>>;
	onChangeStartTime: (startTime: Date) => void;
	onChangeEndTime: (endTime: Date) => void;
};

const initialValues: UpdateContractBodyDto = {
	start_time: null,
	end_time: null,
	host_provides_equipment: false,
	additional_notes: null
};

export const CreateContractBottomSheetContext = createContext(
	{} as CreateContractBottomSheetContextType
);

export const CreateContractBottomSheetProvider: React.FC<
	CreateContractBottomSheetProviderProps
> = ({ children, sheetApi, artistId, eventId }) => {
	const { hostData } = useHostAppContext();
	const sequenceApi = useSequence();
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

	if (!artistId) {
		return <></>;
	}

	return (
		<CreateContractBottomSheetContext.Provider
			value={{
				sheetApi,
				artistId,
				eventId,
				sequenceApi,
				formMethods,
				onSubmit,
				height,
				setHeight,
				onChangeStartTime,
				onChangeEndTime
			}}
		>
			{children}
		</CreateContractBottomSheetContext.Provider>
	);
};

export const useCreateContractBottomSheetContext =
	createUseContextHook<CreateContractBottomSheetContextType>(
		CreateContractBottomSheetContext,
		'CreateContractBottomSheetContext'
	);
