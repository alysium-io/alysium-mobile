import { View } from '@atomic';
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { Button } from '@molecules';
import React from 'react';
import { BottomSheetFooter } from '../overrides';

interface FooterWithDismissButtonProps extends BottomSheetFooterProps {
	dismiss: () => void;
}

const FooterWithDismissButton: React.FC<FooterWithDismissButtonProps> = ({
	dismiss,
	...props
}) => {
	return (
		<BottomSheetFooter {...props}>
			<View marginHorizontal='l'>
				<Button text='Dismiss' onPress={dismiss} />
			</View>
		</BottomSheetFooter>
	);
};

export default FooterWithDismissButton;
