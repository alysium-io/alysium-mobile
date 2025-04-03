import { PrivateUser } from '@flux/api/user';
import {
	NavigationProp,
	StackActions,
	useNavigation
} from '@react-navigation/native';
import { AuthenticationStackNavigatorParamList } from './types';

interface IUseAuthFlow {
	enterCodePage: (phoneNumber: string) => void;
	acceptTermsPage: (user: PrivateUser) => void;
	createHandlePage: (user: PrivateUser) => void;
	fanAccountCreatedPage: (user: PrivateUser) => void;
	back: () => void;
	allTheWayBack: () => void;
}

const useAuthFlow = (): IUseAuthFlow => {
	const navigation =
		useNavigation<NavigationProp<AuthenticationStackNavigatorParamList>>();

	// Navigation
	const createHandlePage = (user: PrivateUser) =>
		navigation.navigate('CreateHandlePage', { user });
	const acceptTermsPage = (user: PrivateUser) =>
		navigation.navigate('AcceptTermsPage', { user });
	const enterCodePage = (phoneNumber: string) =>
		navigation.navigate('EnterCodePage', { phoneNumber });
	const fanAccountCreatedPage = (user: PrivateUser) =>
		navigation.navigate('FanAccountCreatedPage', { user });
	const back = () => navigation.goBack();
	const allTheWayBack = () => navigation.dispatch(StackActions.popToTop());

	return {
		back,
		enterCodePage,
		acceptTermsPage,
		createHandlePage,
		allTheWayBack,
		fanAccountCreatedPage
	};
};

export default useAuthFlow;
