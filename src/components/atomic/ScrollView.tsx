import { useKeyboard } from '@hooks';
import React from 'react';
import { ScrollView as RNScrollView, ScrollViewProps } from 'react-native';

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
				style={{ overflow: 'visible' }}
				{...props}
			>
				{props.children}
			</RNScrollView>
		);
	}
);

export default ScrollView;
