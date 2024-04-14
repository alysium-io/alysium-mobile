import { useDispatch, useSelector } from '@redux';
import { AuthStage, AuthState } from '@types';
import userApiSlice from 'src/redux/api/user';
import { authActions } from 'src/redux/local/auth';
import usePersistedAppState from './usePersistedAppState';

const { useLazyLoginQuery } = userApiSlice;

interface IUseAuth {
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	setAuthStage: (authStage: AuthStage) => void;
	auth: AuthState;
}

const useAuth = (): IUseAuth => {
	const [lazyLoginQuery] = useLazyLoginQuery();

	const auth: AuthState = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const { reset: resetPersistedAppState, set: setPersistedAppState } =
		usePersistedAppState();

	const login = async (email: string, password: string) => {
		const { data, error } = await lazyLoginQuery({
			body: { email, password }
		});
		if (error) {
			dispatch(authActions.setAuthStage(AuthStage.loggedOut));
		}
		if (data) {
			setPersistedAppState({ token: data.token });
			// dispatch(authActions.setAuthStage(AuthStage.loggedIn));
		}
	};

	const logout = () => {
		resetPersistedAppState();
		dispatch(authActions.setAuthStage(AuthStage.loggedOut));
	};

	const setAuthStage = (authStage: AuthStage) => {
		dispatch(authActions.setAuthStage(authStage));
	};

	return {
		login,
		logout,
		setAuthStage,
		auth
	};
};

export default useAuth;
