import { RefreshControl } from '@atomic';
import { Props } from '@types';
import { useCallback, useState } from 'react';

interface IUseRefresh extends Props<typeof RefreshControl> {}

const useRefresh = (fn: () => any | Promise<any>): IUseRefresh => {
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		Promise.resolve(fn()).finally(() => setRefreshing(false));
	}, [fn]);

	return { refreshing, onRefresh };
};

export default useRefresh;
