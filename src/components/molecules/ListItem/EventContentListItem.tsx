import { useDefaultProps } from '@hooks';
import { Props } from '@types';
import React from 'react';
import ContentListItem from './ContentListItem';

interface EventContentListItemProps extends Props<typeof ContentListItem> {}

const EventContentListItem: React.FC<EventContentListItemProps> = (props) => {
	return (
		<ContentListItem
			{...useDefaultProps(
				{
					profileImageProps: {
						borderRadius: 'l',
						defaultImageProps: {
							icon: 'event'
						}
					}
				},
				props
			)}
		/>
	);
};

export default EventContentListItem;
