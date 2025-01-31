import { Icon, Text, View } from '@atomic';
import { useTheme } from '@hooks';
import React from 'react';
import TotalEventsLoading from './TotalEventsLoading';

interface TotalEventsProps {
	numberOfEvents: number;
	isFetching: boolean;
}

const TotalEvents: React.FC<TotalEventsProps> = ({
	numberOfEvents,
	isFetching
}) => {
	const { theme } = useTheme();
	return (
		<View
			position='absolute'
			bottom={theme.spacing.m}
			flexDirection='row'
			justifyContent='center'
			width='100%'
			alignItems='center'
		>
			<View
				paddingVertical='m'
				paddingHorizontal='l'
				backgroundColor='button.solid.active.bg.default'
				borderRadius='round'
				flexDirection='row'
				justifyContent='center'
				alignItems='center'
				overflow='hidden'
			>
				<Text
					variant='paragraph-large-medium'
					marginRight='s'
					color='button.solid.active.text.default'
				>
					{numberOfEvents > 98 ? '+99' : numberOfEvents} Event
					{numberOfEvents === 1 ? '' : 's'}
				</Text>
				<Icon name='event' size={20} color='button.solid.active.text.default' />
				{isFetching && <TotalEventsLoading />}
			</View>
		</View>
	);
};

export default TotalEvents;
