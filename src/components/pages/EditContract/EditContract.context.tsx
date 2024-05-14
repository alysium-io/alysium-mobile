import { Formatting } from '@etc';
import { contractApiSlice } from '@flux/api/contract';
import { FindOneContractResponseDto } from '@flux/api/contract/dto/find-one-contract.dto';
import { UpdateContractBodyDto } from '@flux/api/contract/dto/update-contract.dto';
import { createUseContextHook, useNavigation } from '@hooks';
import { useRoute } from '@react-navigation/native';
import { EditContractPageRouteProp, ProviderProps } from '@types';
import React, { createContext, useEffect } from 'react';
import {
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	useForm
} from 'react-hook-form';
import { Alert } from 'react-native';

const initialValues: UpdateContractBodyDto = {
	start_time: null,
	end_time: null,
	host_provides_equipment: false,
	additional_notes: null
};

export type EditContractPageContextType = {
	contractData: FindOneContractResponseDto;
	contractError: any;
	contractIsLoading: boolean;
	formMethods: UseFormReturn<UpdateContractBodyDto>;
	onValid: SubmitHandler<UpdateContractBodyDto>;
	onInvalid: SubmitErrorHandler<UpdateContractBodyDto>;
	loadForm: () => void;
	onSubmit: (e?: React.BaseSyntheticEvent<object, any, any>) => Promise<void>;
	confirmDelete: () => void;
	onDeleteEvent: () => void;
	onChangeStartTime: (startTime: Date) => void;
	onChangeEndTime: (endTime: Date) => void;
};

export const EditContractPageContext = createContext(
	{} as EditContractPageContextType
);

export const EditContractPageProvider: React.FC<ProviderProps> = ({
	children
}) => {
	const route = useRoute<EditContractPageRouteProp>();
	const [updateContractMutation] = contractApiSlice.useUpdateMutation();
	const [deleteContractMutation] = contractApiSlice.useDeleteMutation();
	const { back } = useNavigation();

	const {
		data: contractData,
		error: contractError,
		isLoading: contractIsLoading
	} = contractApiSlice.useFindOneQuery({
		params: { contract_id: route.params.contractId }
	});

	useEffect(() => {
		loadForm();
	}, [contractData]);

	/**
	 * Form actions
	 */
	const formMethods = useForm<UpdateContractBodyDto>({
		defaultValues: initialValues
	});

	const onValid: SubmitHandler<UpdateContractBodyDto> = (
		data: UpdateContractBodyDto
	) => {
		data.start_time = Formatting.toUtcIsoFormat(data.start_time);
		data.end_time = Formatting.toUtcIsoFormat(data.end_time);
		updateContractMutation({
			body: data,
			params: { contract_id: route.params.contractId }
		});
	};

	const onInvalid: SubmitErrorHandler<UpdateContractBodyDto> = (
		errors: any
	) => {
		console.log(errors);
	};

	const loadForm = () => {
		if (contractData) {
			formMethods.reset({
				start_time: contractData.start_time ?? initialValues.start_time,
				end_time: contractData.end_time ?? initialValues.end_time,
				host_provides_equipment:
					contractData.host_provides_equipment ??
					initialValues.host_provides_equipment,
				additional_notes:
					contractData.additional_notes ?? initialValues.additional_notes
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
		deleteContractMutation({
			params: { contract_id: route.params.contractId }
		});
		back();
	};

	/**
	 * onChange handlers
	 */
	const onChangeStartTime = (startTime: Date) =>
		formMethods.setValue('start_time', Formatting.toUtcIsoFormat(startTime));
	const onChangeEndTime = (endTime: Date) =>
		formMethods.setValue('end_time', Formatting.toUtcIsoFormat(endTime));

	if (!contractData) {
		return <></>;
	}

	return (
		<EditContractPageContext.Provider
			value={{
				contractData,
				contractError,
				contractIsLoading,
				formMethods,
				onValid,
				onInvalid,
				loadForm,
				onSubmit,
				confirmDelete,
				onDeleteEvent,
				onChangeStartTime,
				onChangeEndTime
			}}
		>
			{children}
		</EditContractPageContext.Provider>
	);
};

export const useEditContractPageContext =
	createUseContextHook<EditContractPageContextType>(
		EditContractPageContext,
		'EditContractPageContext'
	);
