import { useKeyboard } from '@hooks';
import React from 'react';
import { ScrollViewProps } from 'react-native';
import { ScrollView as RNScrollView } from 'react-native-gesture-handler';

const ScrollView = React.forwardRef<RNScrollView, ScrollViewProps>(
	(props, ref) => {
		const { dismiss } = useKeyboard();

		return (
			<RNScrollView
				ref={ref}
				onScrollBeginDrag={dismiss}
				showsVerticalScrollIndicator={
					props.showsVerticalScrollIndicator || false
				}
				showsHorizontalScrollIndicator={
					props.showsHorizontalScrollIndicator || false
				}
				keyboardShouldPersistTaps='always'
				{...props}
			>
				{props.children}
			</RNScrollView>
		);
	}
);

export default ScrollView;
