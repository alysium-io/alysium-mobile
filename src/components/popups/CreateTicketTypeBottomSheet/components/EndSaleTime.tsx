import { DatetimePicker, Or, Text, View } from '@atomic';
import { CreateTicketTypeBodyDto } from '@flux/api/ticket-type/dto/ticket-type-create.dto';
import { ToggleButton } from '@molecules';
import React, { useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { LinearTransition } from 'react-native-reanimated';

interface EndSaleTimeProps {
	formMethods: UseFormReturn<CreateTicketTypeBodyDto>;
	onChangeEndSaleTime: (date: Date) => void;
}

const EndSaleTime: React.FC<EndSaleTimeProps> = ({
	formMethods,
	onChangeEndSaleTime
}) => {
	const [value, setValue] = useState(false);
	const onPress = () => {
		setValue(!value);
		if (value) {
			formMethods.setValue('sale_end_time', null);
		}
	};

	return (
		<View>
			<View animated layout={LinearTransition}>
				{value ? (
					<View>
						<View marginTop='l'>
							<Text
								variant='paragraph-bold'
								color='t2'
								textAlign='center'
								marginBottom='m'
							>
								Sale End
							</Text>
						</View>
						<Controller
							name='sale_end_time'
							control={formMethods.control}
							render={({ field: { value } }) => (
								<DatetimePicker
									date={value ? new Date(value) : new Date()}
									onDateChange={onChangeEndSaleTime}
								/>
							)}
						/>
					</View>
				) : (
					<View margin='l'>
						<Text
							variant='paragraph-bold'
							color='t2'
							textAlign='center'
							marginBottom='m'
						>
							Sale End
						</Text>
						<Text
							variant='paragraph'
							color='t2'
							textAlign='center'
							marginBottom='m'
						>
							This ticket type will come off sale when the event is over.
						</Text>
						<Text
							variant='paragraph-small'
							color='t3'
							textAlign='center'
							marginBottom='m'
						>
							May 23rd, 2024 8:00pm
						</Text>
					</View>
				)}
			</View>
			<View animated layout={LinearTransition} margin='m'>
				<Text
					variant='paragraph-small'
					textAlign='center'
					paddingHorizontal='m'
				>
					{!value
						? 'You must publish the event before tickets will be available for sale.'
						: 'When should this ticket come off sale?'}
				</Text>
				<Or />
				<ToggleButton
					onPress={onPress}
					text="Don't Schedule"
					inactiveText='Schedule'
					value={value}
				/>
			</View>
		</View>
	);
};

export default EndSaleTime;
