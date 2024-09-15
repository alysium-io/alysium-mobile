import { feedbackApiSlice } from '@flux/api/feedback';
import { CreateStandardFeedbackBodyDto } from '@flux/api/feedback/dto/standard-feedback-create.dto';
import { TextInputApi, useTextInput } from '@hooks';
import { ButtonState, useButtonState } from '@molecules';
import {
	SubmitErrorHandler,
	SubmitHandler,
	useForm,
	UseFormReturn
} from 'react-hook-form';
import Toast from 'react-native-toast-message';

interface IUseStandardFeedback {
	buttonState: ButtonState;
	setButtonState: (state: ButtonState) => void;
	formMethods: UseFormReturn<CreateStandardFeedbackBodyDto>;
	onSubmit: () => void;
	feedbackTextInputApi: TextInputApi;
}

const useStandardFeedback = (): IUseStandardFeedback => {
	const feedbackTextInputApi = useTextInput();
	const [createStandardFeedbackMutation] =
		feedbackApiSlice.useCreateStandardFeedbackMutation();
	const { buttonState, setButtonState, success } = useButtonState();

	const formMethods = useForm<CreateStandardFeedbackBodyDto>({
		defaultValues: {
			feedback: ''
		}
	});

	const onValid: SubmitHandler<CreateStandardFeedbackBodyDto> = async (
		data: CreateStandardFeedbackBodyDto
	) => {
		setButtonState('loading');
		createStandardFeedbackMutation({ body: data })
			.unwrap()
			.then(() => {
				success();
				Toast.show({
					type: 'success',
					text1: 'Feedback sent',
					text2: 'Thank you for your feedback!'
				});
				formMethods.reset();
				feedbackTextInputApi.clear();
			})
			.catch(() => {
				setButtonState('active');
				Toast.show({
					type: 'error',
					text1: 'Error: Something went wrong...',
					text2: 'Probably because I am a bad developer'
				});
			});
		setTimeout(() => {
			setButtonState('success');
			setTimeout(() => {
				setButtonState('active');
			}, 500);
		}, 300);
	};

	const onInvalid: SubmitErrorHandler<CreateStandardFeedbackBodyDto> = (
		errors: any
	) => {
		Toast.show({
			type: 'error',
			text1: 'Error: Feedback is empty',
			text2: "Don't be dumb..."
		});
	};

	const onSubmit = formMethods.handleSubmit(onValid, onInvalid);

	return {
		buttonState,
		setButtonState,
		formMethods,
		onSubmit,
		feedbackTextInputApi
	};
};

export default useStandardFeedback;
