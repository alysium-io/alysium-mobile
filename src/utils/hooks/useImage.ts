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

		return env.imagesBaseUrl + key;
	};

	return {
		urlForKey
	};
};

export default useImage;
