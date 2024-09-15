import { PublicStandardFeedback } from '../standard-feedback.entity';

export interface CreateStandardFeedbackBodyDto {
	feedback: string;
}

export interface CreateStandardFeedbackResponseDto
	extends PublicStandardFeedback {}
