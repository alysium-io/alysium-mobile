import { useContext } from 'react';
import { BasePageContext, BasePageContextType } from './context';

const useBasePage = (): BasePageContextType => {
	const context = useContext(BasePageContext);

	if (!context) {
		throw new Error('useBasePage must be used within a BasePageProvider');
	}

	return context;
};

export default useBasePage;
