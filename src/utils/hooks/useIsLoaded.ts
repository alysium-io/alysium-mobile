import { useState } from 'react';

interface IUseIsLoaded {
	isLoaded: boolean;
	onLoad: () => void;
}

const useIsLoaded = (): IUseIsLoaded => {
	/**
	 * Just a simple hook to validate whether or not a component has loaded.
	 * This is mostly used for checking if images or videos have loaded properly.
	 */
	const [isLoaded, setIsLoaded] = useState(false);

	const onLoad = () => setIsLoaded(true);

	return {
		isLoaded,
		onLoad
	};
};

export default useIsLoaded;
