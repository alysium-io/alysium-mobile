import { OnSubmitHandler } from '@types';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface ReduxFormMethods<T extends FieldValues> {
	formMethods: UseFormReturn<T>;
	onSubmit: OnSubmitHandler;
}

export interface ReduxHookFormLifeCycleMethods<B, R> {
	onConfirmedValid?: (data: B) => void;
	onValidDidComplete?: (response: R) => void;
	onValidDidFail?: (error: any) => void;
	onInvalid?: (errors: any) => void;
}

export interface FormApiOptions<B extends FieldValues, R> {
	initialValues?: B;
	methods?: ReduxHookFormLifeCycleMethods<B, R>;
}
