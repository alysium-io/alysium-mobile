import React from 'react';
import { ListItemContainer, ListItemImage, ListItemTitle } from '../shared';

type ContentListItemWithButtonProps = Omit<
	React.ComponentProps<typeof ListItemContainer>,
	'children'
> &
	React.ComponentProps<typeof ListItemTitle> &
	React.ComponentProps<typeof ListItemImage> & {
		Button: React.FC;
	};

const ContentListItemWithButton: React.FC<ContentListItemWithButtonProps> = ({
	title,
	subtitle,
	onPress,
	contentType,
	image,
	border,
	size = 'medium',
	subtitleFirst = false,
	borderRadius = 'round',
	Button
}) => {
	return (
		<ListItemContainer border={border} onPress={onPress}>
			<ListItemImage
				contentType={contentType}
				image={image}
				size={size}
				borderRadius={borderRadius}
			/>
			<ListItemTitle
				title={title}
				subtitle={subtitle}
				subtitleFirst={subtitleFirst}
			/>
			<Button />
		</ListItemContainer>
	);
};

export default ContentListItemWithButton;
