import { KeyboardViewFill } from '@atomic';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';

interface BottomSheetKeyboardAvoidingViewProps
	extends React.ComponentProps<typeof BottomSheetView> {}

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
