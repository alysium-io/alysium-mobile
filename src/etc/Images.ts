import { Asset } from 'react-native-image-picker';

export const createImageFormDataFromAsset = (asset: Asset): FormData => {
	const form = new FormData();
	form.append('file', {
		uri: asset.uri,
		type: asset.type,
		name: asset.fileName
	});
	return form;
};
