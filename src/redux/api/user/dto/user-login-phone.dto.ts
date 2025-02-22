export interface LoginUserPhoneNumberBodyDto {
	phone_number: string;
	passcode: string;
	has_accepted_terms: boolean;
}
