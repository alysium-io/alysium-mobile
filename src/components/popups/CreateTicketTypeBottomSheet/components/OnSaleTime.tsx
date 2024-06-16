import { DatetimePicker, Or, Text, View } from '@atomic';
import { CreateTicketTypeBodyDto } from '@flux/api/ticket-type/dto/ticket-type-create.dto';
import { ToggleButton } from '@molecules';
import React, { useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

interface OnSaleTimeProps {
	formMethods: UseFormReturn<CreateTicketTypeBodyDto>;
	onChangeStartSaleTime: (date: Date) => void;
}

const OnSaleTime: React.FC<OnSaleTimeProps> = ({
	formMethods,
	onChangeStartSaleTime
}) => {
	const onPress = () => setValue(!value);
	const [value, setValue] = useState(false);

	return (
		<View>
			<View animated layout={LinearTransition}>
				{value ? (
					<View
						animated
						entering={FadeIn.duration(200)}
						exiting={FadeOut.duration(200)}
					>
						<View marginTop='l'>
							<Text
								variant='paragraph-bold'
								color='t2'
								textAlign='center'
								marginBottom='m'
							>
								Sale Start
							</Text>
						</View>
						<Controller
							name='sale_start_time'
							control={formMethods.control}
							render={({ field: { value } }) => (
								<DatetimePicker
									date={value ? new Date(value) : new Date()}
									onDateChange={onChangeStartSaleTime}
								/>
							)}
						/>
					</View>
				) : (
					<View
						animated
						entering={FadeIn.duration(200)}
						exiting={FadeOut.duration(200)}
					>
						<View margin='l'>
							<Text
								variant='paragraph-bold'
								color='t2'
								textAlign='center'
								marginBottom='m'
							>
								Sale Start
							</Text>
							<Text
								variant='paragraph'
								color='t2'
								textAlign='center'
								marginBottom='m'
							>
								This ticket type will go on sale immediately when the event is
								published.
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
						: 'When should this ticket become available for fans to purchase?'}
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

export default OnSaleTime;
