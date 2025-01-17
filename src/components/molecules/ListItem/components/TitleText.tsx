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
	bottomSubtext?: string | null;
	titleVariant?: Props<typeof Text>['variant'];
	topSubtextVariant?: Props<typeof Text>['variant'];
	bottomSubtextVariant?: Props<typeof Text>['variant'];
	titleColor?: Props<typeof Text>['color'];
	topSubtextColor?: Props<typeof Text>['color'];
	bottomSubtextColor?: Props<typeof Text>['color'];
	containerProps?: Props<typeof View>;
	titleProps?: Props<typeof Text>;
	bottomSubtextProps?: Props<typeof Text>;
}

const TitleText: React.FC<TitleTextProps> = ({
	title,
	topSubtext,
	bottomSubtext,
	titleVariant = 'paragraph-large-medium',
	topSubtextVariant = 'paragraph-small',
	bottomSubtextVariant = 'paragraph-small',
	titleColor = 'text.p',
	topSubtextColor = 'text.s',
	bottomSubtextColor = 'text.s',
	containerProps,
	titleProps,
	bottomSubtextProps
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
					{...wrapTextProps}
				>
					{topSubtext}
				</Text>
			)}
			<Text
				variant={titleVariant}
				color={titleColor}
				{...Object.assign(wrapTextProps, titleProps)}
			>
				{title}
			</Text>
			{bottomSubtext && (
				<Text
					marginTop='xs'
					variant={bottomSubtextVariant}
					color={bottomSubtextColor}
					{...Object.assign(wrapTextProps, bottomSubtextProps)}
				>
					{bottomSubtext}
				</Text>
			)}
		</View>
	);
};

export default TitleText;
