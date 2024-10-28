import { Asset } from 'react-native-image-picker';

export const createImageFormDataFromAsset = (
	asset: Asset,
	otherFields?: object
): FormData => {
	const form = new FormData();
	form.append('file', {
		uri: asset.uri,
		type: asset.type,
		name: asset.fileName
	});

	if (otherFields) {
		Object.entries(otherFields).forEach(([key, value]) => {
			form.append(key, value);
		});
	}

	return form;
};
