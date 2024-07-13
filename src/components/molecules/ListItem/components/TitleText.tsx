import { Text, View } from '@atomic';
import React from 'react';

type WrapTextProps = {
	numberOfLines: React.ComponentProps<typeof Text>['numberOfLines'];
	ellipsizeMode: React.ComponentProps<typeof Text>['ellipsizeMode'];
};

export interface TitleTextProps {
	title: string;
	topSubtext?: string;
	bottomSubtext?: string;
	wrapTitle?: boolean;
	wrapTopSubtext?: boolean;
	wrapBottomSubtext?: boolean;
	titleVariant?: React.ComponentProps<typeof Text>['variant'];
	topSubtextVariant?: React.ComponentProps<typeof Text>['variant'];
	bottomSubtextVariant?: React.ComponentProps<typeof Text>['variant'];
	titleColor?: React.ComponentProps<typeof Text>['color'];
	topSubtextColor?: React.ComponentProps<typeof Text>['color'];
	bottomSubtextColor?: React.ComponentProps<typeof Text>['color'];
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
	bottomSubtextColor = 'text.s'
}) => {
	const wrapTextProps: WrapTextProps = {
		numberOfLines: 1,
		ellipsizeMode: 'tail'
	};

	return (
		<View flex={1}>
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
