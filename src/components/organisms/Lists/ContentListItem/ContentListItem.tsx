import React from 'react';
import {
	ListItemActionIcon,
	ListItemContainer,
	ListItemImage,
	ListItemMarker,
	ListItemRank,
	ListItemTitle
} from '../shared';

type ContentListItemProps = Omit<
	React.ComponentProps<typeof ListItemContainer>,
	'children'
> &
	React.ComponentProps<typeof ListItemMarker> &
	React.ComponentProps<typeof ListItemTitle> &
	React.ComponentProps<typeof ListItemActionIcon> &
	React.ComponentProps<typeof ListItemRank> &
	React.ComponentProps<typeof ListItemImage> & {
		onPressMenu?: () => void;
	};

const ContentListItem: React.FC<ContentListItemProps> = ({
	title,
	subtitle,
	rnk,
	onPress,
	contentType,
	image,
	border,
	onPressMenu,
	markerIcon,
	actionIcon,
	size = 'medium',
	subtitleFirst = false,
	borderRadius = 'round'
}) => {
	return (
		<ListItemContainer border={border} onPress={onPress}>
			<ListItemRank rnk={rnk} />
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
			{markerIcon && <ListItemMarker markerIcon={markerIcon} />}
			<ListItemActionIcon actionIcon={actionIcon} onPress={onPressMenu} />
		</ListItemContainer>
	);
};

export default ContentListItem;
