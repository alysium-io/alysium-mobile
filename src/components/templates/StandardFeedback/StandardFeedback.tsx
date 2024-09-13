import { Section } from '@atomic';
import { Button, TextBox } from '@molecules';
import React from 'react';
import { Controller } from 'react-hook-form';
import useStandardFeedback from './useStandardFeedback';

interface FeedbackProps {
	onFocus?: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({ onFocus }) => {
	const { formMethods, onSubmit, buttonState, feedbackTextInputApi } =
		useStandardFeedback();

	return (
		<Section margin='m'>
			<Controller
				name='feedback'
				control={formMethods.control}
				rules={{ required: 'Feedback is required' }}
				render={({ field: { onChange, onBlur } }) => (
					<TextBox
						textInputApi={feedbackTextInputApi}
						onChangeText={onChange}
						onBlur={onBlur}
						onFocus={onFocus}
						placeholder='Feedback...'
						subtitle="Request a feature, report a bug, or just say hi! (if you're going to be offensive, at least be funny)"
					/>
				)}
			/>
			<Button
				text='Send'
				onPress={onSubmit}
				containerProps={{ marginTop: 'm' }}
				buttonState={buttonState}
			/>
		</Section>
	);
};

export default Feedback;
