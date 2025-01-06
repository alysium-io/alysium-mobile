import { SkeletonPlaceholder, View } from '@atomic';
import { useTheme } from '@hooks';
import React from 'react';

interface ContentListItemSkeletonPlaceholderProps {
	withImage?: boolean;
}

const ContentListItemSkeletonPlaceholder: React.FC<
	ContentListItemSkeletonPlaceholderProps
> = ({ withImage = true }) => {
	const { theme } = useTheme();
	return (
		<SkeletonPlaceholder>
			<View
				style={{
					flexDirection: 'row',
					marginVertical: 0,
					marginHorizontal: theme.spacing.m,
					paddingVertical: theme.spacing.m,
					paddingHorizontal: 0,
					borderBottomWidth: theme.borderWidth.hairline
				}}
			>
				{withImage && (
					<View
						style={{
							width: 65,
							height: 65,
							borderRadius: 9999,
							marginBottom: 0,
							paddingBottom: 0,
							marginRight: theme.spacing.m
						}}
					/>
				)}
				<View
					style={{
						flex: 1,
						margin: 0,
						padding: 0,
						paddingVertical: theme.spacing.m
					}}
				>
					<View
						style={{
							width: '60%',
							height: 16,
							marginBottom: theme.spacing.s,
							borderRadius: theme.borderRadii.s
						}}
					/>
					<View
						style={{
							width: '40%',
							height: 12,
							borderRadius: theme.borderRadii.s
						}}
					/>
				</View>
			</View>
		</SkeletonPlaceholder>
	);
};

export default ContentListItemSkeletonPlaceholder;
