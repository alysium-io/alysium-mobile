import { Section } from '@atomic';
import { RadioListItem } from '@organisms';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useEditContractPageContext } from '../EditContract.context';

const SlotDetailsSection = () => {
	const { formMethods } = useEditContractPageContext();
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
