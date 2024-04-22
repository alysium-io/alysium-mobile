import { AuthStage } from '@types';
import { userApiSlice } from 'src/redux/api/user';
import { GetMeResponseDto } from 'src/redux/api/user/dto/user-me.dto';
import useAuth from './useAuth';

const { useLazyMeQuery } = userApiSlice;

interface IUseUser {
	me: () => Promise<GetMeResponseDto | undefined>;
}

const useUser = (): IUseUser => {
	const [lazyMeQuery] = useLazyMeQuery();

	const { setAuthStage } = useAuth();

	const me = async (): Promise<GetMeResponseDto | undefined> => {
		const { data, error } = await lazyMeQuery();
		if (error) {
			setAuthStage(AuthStage.loggedOut);
			return undefined;
		} else {
			setAuthStage(AuthStage.loggedIn);
			return data;
		}
	};

	return {
		me
	};
};

export default useUser;
