import { Text, View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type WrapTextProps = {
	numberOfLines: Props<typeof Text>['numberOfLines'];
	ellipsizeMode: Props<typeof Text>['ellipsizeMode'];
};

export interface TitleTextProps {
	title: string;
	topSubtext?: string;
	bottomSubtext?: string;
	wrapTitle?: boolean;
	wrapTopSubtext?: boolean;
	wrapBottomSubtext?: boolean;
	titleVariant?: Props<typeof Text>['variant'];
	topSubtextVariant?: Props<typeof Text>['variant'];
	bottomSubtextVariant?: Props<typeof Text>['variant'];
	titleColor?: Props<typeof Text>['color'];
	topSubtextColor?: Props<typeof Text>['color'];
	bottomSubtextColor?: Props<typeof Text>['color'];
	containerProps?: Props<typeof View>;
}

const TitleText: React.FC<TitleTextProps> = ({
	title,
	topSubtext,
	bottomSubtext,
	wrapTitle = true,
	wrapTopSubtext,
	wrapBottomSubtext,
	titleVariant = 'paragraph-large-medium',
	topSubtextVariant = 'paragraph-small',
	bottomSubtextVariant = 'paragraph-small',
	titleColor = 'text.p',
	topSubtextColor = 'text.s',
	bottomSubtextColor = 'text.s',
	containerProps
}) => {
	const wrapTextProps: WrapTextProps = {
		numberOfLines: 1,
		ellipsizeMode: 'tail'
	};

	return (
		<View flex={1} {...containerProps}>
			{topSubtext && (
				<Text
					marginBottom='xs'
					variant={topSubtextVariant}
					color={topSubtextColor}
					{...(wrapTopSubtext && wrapTextProps)}
				>
					{topSubtext}
				</Text>
			)}
			<Text
				variant={titleVariant}
				color={titleColor}
				{...(wrapTitle && wrapTextProps)}
			>
				{title}
			</Text>
			{bottomSubtext && (
				<Text
					marginTop='xs'
					variant={bottomSubtextVariant}
					color={bottomSubtextColor}
					{...(wrapBottomSubtext && wrapTextProps)}
				>
					{bottomSubtext}
				</Text>
			)}
		</View>
	);
};

export default TitleText;
