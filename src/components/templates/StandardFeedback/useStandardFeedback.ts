import { TextInputApi, useTextInput, useToast } from '@hooks';
import { ButtonStateApi, useButtonState } from '@molecules';
import useCreateStandardFeedbackFormApi, {
	CreateStandardFeedbackFormApi
} from '@src/utils/redux-hook-form/useCreateStandardFeedbackFormApi';

interface IUseStandardFeedback {
	createStandardFeedbackFormApi: CreateStandardFeedbackFormApi;
	submitStandardFeedbackButtonApi: ButtonStateApi;
	feedbackTextInputApi: TextInputApi;
}

const useStandardFeedback = (): IUseStandardFeedback => {
	const { toastSuccess } = useToast();
	const submitStandardFeedbackButtonApi = useButtonState();
	const feedbackTextInputApi = useTextInput();

	const createStandardFeedbackFormApi = useCreateStandardFeedbackFormApi({
		methods: {
			onConfirmedValid: () => {
				submitStandardFeedbackButtonApi.setButtonState('loading');
			},
			onValidDidComplete: () => {
				toastSuccess('Thank you for your feedback!');
				submitStandardFeedbackButtonApi.buttonSuccess();
				feedbackTextInputApi.reset();
			},
			onValidDidFail: () => {
				submitStandardFeedbackButtonApi.setButtonState('active');
			}
		}
	});

	return {
		createStandardFeedbackFormApi,
		submitStandardFeedbackButtonApi,
		feedbackTextInputApi
	};
};

export default useStandardFeedback;
