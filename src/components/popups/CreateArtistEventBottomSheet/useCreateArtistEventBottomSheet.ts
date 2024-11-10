import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { SheetApi, TextInputApi, useNavigation, useTextInput } from '@hooks';
import { ButtonStateApi, useButtonState } from '@molecules';
import useCreateArtistEventFormApi, {
	CreateArtistEventFormApi
} from '@src/utils/redux-hook-form/useCreateArtistEventFormApi';
import { useEffect } from 'react';

interface IuseCreateArtistEventBottomSheet {
	close: () => void;
	onSheetIndexChangeFocusTextInput: (index: number) => void;
	eventNameTextInputApi: TextInputApi;
	createArtistEventFormApi: CreateArtistEventFormApi;
	createArtistEventButtonStateApi: ButtonStateApi;
}

const useCreateArtistEventBottomSheet = (
	sheetApi: SheetApi
): IuseCreateArtistEventBottomSheet => {
	const eventNameTextInputApi = useTextInput();
	const createArtistEventButtonStateApi = useButtonState('disabled');
	const { editArtistEventPage } = useNavigation();
	const { artistData } = useArtistAppContext();
	const createArtistEventFormApi = useCreateArtistEventFormApi({
		methods: {
			onConfirmedValid: () => {
				createArtistEventButtonStateApi.setButtonState('loading');
			},
			onValidDidComplete: (response) => {
				close();
				setTimeout(() => {
					editArtistEventPage(response.event.event_uid, {
						from: 'EditArtistPage',
						from_uid: artistData.artist_uid,
						to: 'EditArtistEventPage',
						to_uid: response.event.event_uid,
						using: 'CREATE_ARTIST_EVENT_CONTENT_LIST_ITEM'
					});
				}, 500);
			},
			onValidDidFail: () => {
				createArtistEventButtonStateApi.setButtonState('active');
			}
		}
	});

	useEffect(() => {
		if (createArtistEventFormApi.formMethods.getValues('name').length > 0) {
			createArtistEventButtonStateApi.setButtonState('active');
		} else {
			createArtistEventButtonStateApi.setButtonState('disabled');
		}
	}, [createArtistEventFormApi.formMethods.watch('name')]);

	const onSheetIndexChangeFocusTextInput = (index: number) => {
		if (index === 0) {
			eventNameTextInputApi.focus();
		}
	};

	const close = () => {
		sheetApi.close();
	};

	return {
		close,
		onSheetIndexChangeFocusTextInput,
		eventNameTextInputApi,
		createArtistEventFormApi,
		createArtistEventButtonStateApi
	};
};

export default useCreateArtistEventBottomSheet;
