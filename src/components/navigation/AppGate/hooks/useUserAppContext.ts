import { useContext } from 'react';
import { UserAppContext, UserAppContextType } from '../contexts';

const useUserAppContext = (): UserAppContextType => {
	const context = useContext(UserAppContext);

	if (!context) {
		throw new Error('useUserApp must be used within a UserAppProvider');
	}

	return context;
};

export default useUserAppContext;
