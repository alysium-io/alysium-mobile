import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';

export type SheetRef = React.MutableRefObject<BottomSheetModal | null>;

export type SheetApi = {
	sheetRef: SheetRef;
	open: () => void;
	close: () => void;
	instantClose: () => void;
	snap: (index: number) => void;
	expand: () => void;
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

	/**
	 * Note about `snapToIndex`
	 *   You cannot use `snapToIndex` until you have called `present` on the sheet.
	 *   So essentially, you must "open" the sheet before you can control it.
	 */
	const snap = (index: number) => {
		sheetRef.current?.snapToIndex(index);
	};

	const expand = () => {
		sheetRef.current?.expand();
	};

	return {
		sheetRef,
		open,
		close,
		instantClose,
		snap,
		expand
	};
};

export default useSheet;
