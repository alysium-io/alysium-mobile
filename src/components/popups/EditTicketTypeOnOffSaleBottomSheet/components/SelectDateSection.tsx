import { DatetimePicker, Text, View } from '@atomic';
import { UpdateTicketTypeBodyDto } from '@flux/api/ticket-type/dto/ticket-type-update.dto';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { Else, If, Then } from 'react-if';
import { LinearTransition } from 'react-native-reanimated';

interface SelectDateSectionProps {
	dateValue: string | null;
	onChange: (date: Date | null) => void;
	formMethods: UseFormReturn<UpdateTicketTypeBodyDto>;
	title: string;
	notSchedulingText: string;
	controllerFieldName: keyof UpdateTicketTypeBodyDto;
}

const SelectDateSection: React.FC<SelectDateSectionProps> = ({
	dateValue,
	onChange,
	formMethods,
	title,
	notSchedulingText,
	controllerFieldName
}) => {
	return (
		<View animated layout={LinearTransition}>
			<View margin='l'>
				<Text
					variant='paragraph-bold'
					color='t2'
					textAlign='center'
					marginBottom='m'
				>
					{title}
				</Text>
				<If condition={dateValue !== null}>
					<Then>
						<Controller
							name={controllerFieldName}
							control={formMethods.control}
							render={({ field: { value } }) => (
								<DatetimePicker
									date={value ? new Date(value) : new Date()}
									onDateChange={onChange}
								/>
							)}
						/>
					</Then>
					<Else>
						<Text
							variant='paragraph'
							color='t2'
							textAlign='center'
							marginBottom='m'
						>
							{notSchedulingText}
						</Text>
						<Text
							variant='paragraph-small'
							color='t3'
							textAlign='center'
							marginBottom='m'
						>
							May 23rd, 2024 8:00pm
						</Text>
					</Else>
				</If>
			</View>
		</View>
	);
};

export default SelectDateSection;
