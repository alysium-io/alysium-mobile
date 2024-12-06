import React from 'react';
import { Dimensions, StyleProp, View, ViewStyle } from 'react-native';

interface GridItem {
	[key: string]: any;
}

interface RenderItemInfo<T extends GridItem> {
	item: T;
	index: number;
}

interface DynamicGridProps<T extends GridItem> {
	data: T[];
	renderItem: (info: RenderItemInfo<T>) => React.ReactElement;
	contentHeight?: number;
	maxItemsPerRow?: number;
	style?: StyleProp<ViewStyle>;
	margin?: number;
	rowMargin?: number;
	columnMargin?: number;
	interMargin?: number;
}

const DEFAULT_MAX_ITEMS = 3;

// Calculate default height based on screen width
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DEFAULT_MARGIN = 1;
const DEFAULT_CONTENT_HEIGHT =
	(SCREEN_WIDTH - DEFAULT_MARGIN * (DEFAULT_MAX_ITEMS + 1)) / DEFAULT_MAX_ITEMS;

function DynamicGrid<T extends GridItem>({
	data = [],
	renderItem,
	contentHeight = DEFAULT_CONTENT_HEIGHT,
	maxItemsPerRow = DEFAULT_MAX_ITEMS,
	style,
	margin = 0,
	rowMargin = 1,
	columnMargin = 1,
	interMargin
}: DynamicGridProps<T>): React.ReactElement {
	// Use interMargin if provided, otherwise use individual margins
	const effectiveRowMargin = interMargin ?? rowMargin;
	const effectiveColumnMargin = interMargin ?? columnMargin;

	const rows = data.reduce<T[][]>((acc, item, index) => {
		const rowIndex = Math.floor(index / maxItemsPerRow);
		if (!acc[rowIndex]) {
			acc[rowIndex] = [];
		}
		acc[rowIndex].push(item);
		return acc;
	}, []);

	const containerStyle = {
		padding: margin,
		// Use flex for container instead of width to prevent overflow
		flex: 1
	};

	const rowStyle = (isLastRow: boolean) => ({
		flexDirection: 'row' as const,
		marginBottom: isLastRow ? 0 : effectiveRowMargin,
		// Use flex for row to maintain full width
		flex: 1
	});

	const itemStyle = (isLastItem: boolean) => ({
		flex: 1,
		height: contentHeight,
		marginRight: isLastItem ? 0 : effectiveColumnMargin
	});

	return (
		<View style={[containerStyle, style]}>
			{rows.map((row, rowIndex) => (
				<View
					key={`row-${rowIndex}`}
					style={rowStyle(rowIndex === rows.length - 1)}
				>
					{row.map((item, itemIndex) => (
						<View
							key={`item-${rowIndex}-${itemIndex}`}
							style={itemStyle(itemIndex === row.length - 1)}
						>
							{renderItem({
								item,
								index: rowIndex * maxItemsPerRow + itemIndex
							})}
						</View>
					))}
				</View>
			))}
		</View>
	);
}

export default DynamicGrid;
