import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';

export type SheetRef = React.MutableRefObject<BottomSheetModal | null>;

export type SheetApi = {
	sheetRef: SheetRef;
	open: () => void;
	close: () => void;
	instantClose: () => void;
};

const useSheet = (): SheetApi => {
	const sheetRef = useRef<BottomSheetModal | null>(null);

	const open = () => {
		sheetRef.current?.present();
	};

	const close = () => {
		sheetRef.current?.dismiss();
	};

	const instantClose = () => {
		sheetRef.current?.dismiss({ duration: 0 });
	};

	return {
		sheetRef,
		open,
		close,
		instantClose
	};
};

export default useSheet;
