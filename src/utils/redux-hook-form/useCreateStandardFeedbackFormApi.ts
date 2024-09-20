import { feedbackApiSlice } from '@flux/api/feedback';
import {
	CreateStandardFeedbackBodyDto,
	CreateStandardFeedbackResponseDto
} from '@flux/api/feedback/dto/standard-feedback-create.dto';
import { useForm, useToast } from '@hooks';
import { FormApiOptions, ReduxFormMethods } from './shared';

export interface CreateStandardFeedbackFormApi
	extends ReduxFormMethods<CreateStandardFeedbackBodyDto> {}

const useCreateStandardFeedbackFormApi = (
	formApiOptions?: FormApiOptions<
		CreateStandardFeedbackBodyDto,
		CreateStandardFeedbackResponseDto
	>
): CreateStandardFeedbackFormApi => {
	const { toastError } = useToast();
	const [createStandardFeedbackMutation] =
		feedbackApiSlice.useCreateStandardFeedbackMutation();

	return useForm<CreateStandardFeedbackBodyDto>(
		Object.assign(
			{
				feedback: ''
			},
			formApiOptions?.initialValues
		),
		{
			onValid: async (data: CreateStandardFeedbackBodyDto) => {
				formApiOptions?.methods?.onConfirmedValid?.(data);
				createStandardFeedbackMutation({ body: data })
					.unwrap()
					.then((res) => {
						formApiOptions?.methods?.onValidDidComplete?.(res);
					})
					.catch((err) => {
						formApiOptions?.methods?.onValidDidFail?.(err) && toastError();
					});
			}
		}
	);
};

export default useCreateStandardFeedbackFormApi;
