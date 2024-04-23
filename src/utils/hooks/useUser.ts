import { userApiSlice } from '@flux/api/user';
import { GetMeResponseDto } from '@flux/api/user/dto/user-me.dto';
import { AuthStage } from '@types';
import useAuth from './useAuth';

interface IUseUser {
	me: () => Promise<GetMeResponseDto | undefined>;
}

const useUser = (): IUseUser => {
	const [lazyMeQuery] = userApiSlice.useLazyMeQuery();

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
