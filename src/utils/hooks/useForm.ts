import { useToast } from '@hooks';
import { OnSubmitHandler } from '@types';
import {
	DefaultValues,
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
	displayDefaultErrorAsToast?: boolean;
}

function useForm<T extends FieldValues>(
	initialValues: DefaultValues<T>,
	methods: FormMethods<T>
): IUseForm<T> {
	const { toastError } = useToast();
	const formMethods = useReactForm<T>({
		defaultValues: initialValues
	});
	const defaultOnValid: SubmitHandler<T> = (data: T) =>
		console.log('Valid form data:', data);
	const defaultOnInvalid: SubmitErrorHandler<T> = (error: any) => {
		if (
			methods.displayDefaultErrorAsToast === true ||
			methods.displayDefaultErrorAsToast === undefined
		) {
			console.log('Invalid form data:', error);
			const errorNames = Object.keys(error);
			if (errorNames.length > 0 && error[errorNames[0]].message) {
				toastError(error[errorNames[0]].message);
			} else {
				toastError(error?.feedback?.message ?? 'Invalid form data');
			}
		}
		if (methods.onInvalid) {
			methods.onInvalid(error);
		}
	};

	// const _initialValues = useRef<typeof initialValues>(initialValues);

	// useEffect(() => {
	// 	if (!_.isEqual(initialValues, _initialValues.current)) {
	// 		_initialValues.current = initialValues;
	// 		formMethods.reset(initialValues, { keepDirty: true });
	// 	}
	// }, [initialValues]);

	const onSubmit = formMethods.handleSubmit(
		methods.onValid || defaultOnValid,
		defaultOnInvalid
	);

	return {
		formMethods,
		onSubmit
	};
}

export default useForm;
