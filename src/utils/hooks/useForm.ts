import { useToast } from '@hooks';
import { OnSubmitHandler } from '@types';
import {
	FieldValues,
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	useForm as useReactForm
} from 'react-hook-form';

interface IUseForm<T extends FieldValues> {
	formMethods: UseFormReturn<T>;
	onSubmit: OnSubmitHandler;
}

interface FormMethods<T extends FieldValues> {
	onValid?: SubmitHandler<T>;
	onInvalid?: SubmitErrorHandler<T>;
}

function useForm<T extends FieldValues>(
	initialValues: T,
	methods: FormMethods<T>
): IUseForm<T> {
	const { toastError } = useToast();
	const formMethods = useReactForm<T>(initialValues);
	const defaultOnValid: SubmitHandler<T> = (data: T) =>
		console.log('Valid form data:', data);
	const defaultOnInvalid: SubmitErrorHandler<T> = (error: any) => {
		console.log('Invalid form data:', error);
		toastError(error?.feedback?.message ?? 'Invalid form data');
	};

	const onSubmit = formMethods.handleSubmit(
		methods.onValid || defaultOnValid,
		methods.onInvalid || defaultOnInvalid
	);

	return {
		formMethods,
		onSubmit
	};
}

export default useForm;
