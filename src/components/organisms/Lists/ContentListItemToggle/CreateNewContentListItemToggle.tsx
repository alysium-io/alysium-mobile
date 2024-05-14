import React from 'react';
import { ListItemContainer, ListItemTitle } from '../shared';
import ContentListItemToggleCustomIcon from './ContentListItemToggleCustomIcon';
import ContentListItemToggleImageIcon from './ContentListItemToggleImageIcon';

type CreateNewContentListItemToggleProps = React.ComponentProps<
	typeof ListItemTitle
> &
	Omit<React.ComponentProps<typeof ListItemContainer>, 'children'>;

const CreateNewContentListItemToggle: React.FC<
	CreateNewContentListItemToggleProps
> = ({ title, subtitle, onPress, subtitleFirst = false, border = true }) => {
	return (
		<ListItemContainer border={border} onPress={onPress}>
			<ContentListItemToggleImageIcon size='medium' icon='plus' />
			<ListItemTitle
				title={title}
				subtitle={subtitle}
				subtitleFirst={subtitleFirst}
			/>
			<ContentListItemToggleCustomIcon icon='arrow-right' />
		</ListItemContainer>
	);
};

export default CreateNewContentListItemToggle;
