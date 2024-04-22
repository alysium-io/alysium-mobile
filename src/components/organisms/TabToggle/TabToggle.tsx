import { View } from '@atomic';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import TabToggleBar from './TabToggleBar';
import TabToggleContent from './TabToggleContent';
import TabToggleContentItem from './TabToggleContentItem';
import useTabToggle from './useTabToggle';

const { width: containerWidth } = Dimensions.get('window');

type ContentItem = {
	title: string;
	content: React.ReactNode;
};
type Content = ContentItem[];

interface TabToggleProps {
	content: Content;
	defaultTabIndex?: number;
}

const TabToggle: React.FC<TabToggleProps> = ({
	content,
	defaultTabIndex = 0
}) => {
	const {
		animatedValue,
		onPressTab,
		setScrollViewReady,
		scrollHandler,
		setContentRef
	} = useTabToggle(defaultTabIndex);

	return (
		<View style={styles.container}>
			<TabToggleBar
				tabs={content.map((item) => item.title)}
				animatedValue={animatedValue}
				onPressTab={onPressTab}
			/>
			<TabToggleContent
				setScrollViewReady={setScrollViewReady}
				scrollHandler={scrollHandler}
				setContentRef={setContentRef}
			>
				{content.map((item, index) => (
					<TabToggleContentItem key={index}>
						{item.content}
					</TabToggleContentItem>
				))}
			</TabToggleContent>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: containerWidth,
		height: '100%'
	}
});

export default TabToggle;
