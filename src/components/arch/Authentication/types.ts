import { PrivateUser } from '@flux/api/user';
import { RouteProp } from '@react-navigation/native';

type RegisterUserPhoneNumberPage = undefined;
type EnterCodePage = { phoneNumber: string };
type AcceptTermsPage = { user: PrivateUser };
type CreateHandlePage = { user: PrivateUser };
type FanAccountCreatedPage = { user: PrivateUser };
export type AuthenticationStackNavigatorParamList = {
	RegisterUserPhoneNumberPage: RegisterUserPhoneNumberPage;
	AcceptTermsPage: AcceptTermsPage;
	CreateHandlePage: CreateHandlePage;
	EnterCodePage: EnterCodePage;
	FanAccountCreatedPage: FanAccountCreatedPage;
};

export type EnterCodePageRouteProp = RouteProp<
	AuthenticationStackNavigatorParamList,
	'EnterCodePage'
>;

export type AcceptTermsPageRouteProp = RouteProp<
	AuthenticationStackNavigatorParamList,
	'AcceptTermsPage'
>;

export type CreateHandlePageRouteProp = RouteProp<
	AuthenticationStackNavigatorParamList,
	'CreateHandlePage'
>;

export type FanAccountCreatedPageRouteProp = RouteProp<
	AuthenticationStackNavigatorParamList,
	'FanAccountCreatedPage'
>;
