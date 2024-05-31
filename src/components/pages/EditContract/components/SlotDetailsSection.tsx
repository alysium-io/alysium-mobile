import { Section } from '@atomic';
import { UpdateContractBodyDto } from '@flux/api/contract/dto/update-contract.dto';
import { RadioListItem } from '@organisms';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface SlotDetailsSectionProps {
	formMethods: UseFormReturn<UpdateContractBodyDto>;
}

const SlotDetailsSection: React.FC<SlotDetailsSectionProps> = ({
	formMethods
}) => {
	return (
		<Section margin='m'>
			<Controller
				name='host_provides_equipment'
				control={formMethods.control}
				render={({ field: { value } }) => (
					<RadioListItem
						checked={value}
						onPress={() =>
							formMethods.setValue('host_provides_equipment', !value)
						}
						title='Equipment provided?'
						subtitle={[
							{
								text: 'Add an ',
								variant: 'paragraph-small'
							},
							{
								text: 'Equipment List',
								variant: 'paragraph-small',
								color: 'matt',
								underline: true
							}
						]}
					/>
				)}
			/>
		</Section>
	);
};

export default SlotDetailsSection;
