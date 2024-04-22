import { createUseContextHook } from '@hooks';
import { ProviderProps } from '@types';
import React, { createContext } from 'react';
import { Asset } from 'react-native-image-picker';

export type ProfilePageContextType = {
	changeProfileImage: (imagePickerAsset: Asset) => void;
};

export const ProfilePageContext = createContext({} as ProfilePageContextType);

export const ProfilePageProvider: React.FC<ProviderProps> = ({ children }) => {
	// const { uploadUserProfileImage } = useImages()
	const uploadUserProfileImage = (image: {
		uri: string;
		type: string;
		name: string;
	}) => {
		console.log('uploadUserProfileImage', image);
	};

	const changeProfileImage = (imagePickerAsset: Asset) => {
		if (
			imagePickerAsset.uri &&
			imagePickerAsset.type &&
			imagePickerAsset.fileName
		) {
			uploadUserProfileImage({
				uri: imagePickerAsset.uri,
				type: imagePickerAsset.type,
				name: imagePickerAsset.fileName
			});
		}
	};

	return (
		<ProfilePageContext.Provider
			value={{
				changeProfileImage
			}}
		>
			{children}
		</ProfilePageContext.Provider>
	);
};

export const useProfilePageContext =
	createUseContextHook<ProfilePageContextType>(
		ProfilePageContext,
		'ProfilePageContext'
	);
