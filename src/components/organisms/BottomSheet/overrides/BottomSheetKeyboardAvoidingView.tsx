import { KeyboardViewFill } from '@atomic';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { Props } from '@types';
import React from 'react';

interface BottomSheetKeyboardAvoidingViewProps
	extends Props<typeof BottomSheetView> {}

const BottomSheetKeyboardAvoidingView: React.FC<
	BottomSheetKeyboardAvoidingViewProps
> = ({ children, ...props }) => {
	return (
		<BottomSheetView {...props}>
			{children}
			<KeyboardViewFill />
		</BottomSheetView>
	);
};

export default BottomSheetKeyboardAvoidingView;
