import { artistApiSlice } from '@flux/api/artist';
import { useTextInput } from '@hooks';

interface IUseCreateArtist {
	newArtistText: React.RefObject<string>;
	setNewArtistText: (newArtistName: string) => void;
	submitNewArtist: () => void;
	onDismiss: () => void;
}

const useCreateArtist = (): IUseCreateArtist => {
	const {
		text: newArtistText,
		setText: setNewArtistText,
		reset: resetNewArtistText
	} = useTextInput();

	const [createArtist] = artistApiSlice.useCreateMutation();

	const submitNewArtist = () => {
		if (newArtistText.current)
			createArtist({ body: { name: newArtistText.current } });
	};

	const onDismiss = () => resetNewArtistText();

	return {
		newArtistText,
		setNewArtistText,
		submitNewArtist,
		onDismiss
	};
};

export default useCreateArtist;
