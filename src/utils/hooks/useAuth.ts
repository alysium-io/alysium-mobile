import { useDispatch, useSelector } from '@flux';
import { userApiSlice } from '@flux/api/user';
import { authActions } from '@flux/local/auth';
import { AuthStage, AuthState } from '@types';
import usePersistedAppState from './usePersistedAppState';

interface IUseAuth {
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	setAuthStage: (authStage: AuthStage) => void;
	auth: AuthState;
}

const useAuth = (): IUseAuth => {
	const [lazyLoginQuery] = userApiSlice.useLazyLoginQuery();

	const auth: AuthState = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const { resetPersistedAppState, setPersistedAppState } =
		usePersistedAppState();

	const login = async (email: string, password: string) => {
		const { data, error } = await lazyLoginQuery({
			body: { email, password }
		});
		if (error) {
			logout();
		}
		if (data) {
			setPersistedAppState({ token: data.token });
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
