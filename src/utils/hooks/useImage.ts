import { useEnvContext } from '../contexts';

interface IUseImage {
	urlForKey: (key?: string) => string | undefined;
}

const useImage = (): IUseImage => {
	const { env } = useEnvContext();

	const urlForKey = (key?: string): string | undefined => {
		if (!key || key === '') {
			return undefined;
		}

		// If it already starts with the base url, return it as is
		if (key.startsWith(env.imagesBaseUrl)) {
			return key;
		}

		return env.imagesBaseUrl + key;
	};

	return {
		urlForKey
	};
};

export default useImage;
