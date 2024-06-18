import { Section, View } from '@atomic';
import { UpdateEventBodyDto } from '@flux/api/event/dto/event-update.dto';
import { SectionHeader } from '@molecules';
import { RadioListItem } from '@organisms';
import { OnSubmitHandler } from '@types';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface FeaturesSectionProps {
	formMethods: UseFormReturn<UpdateEventBodyDto>;
	onSubmit: OnSubmitHandler;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
	formMethods,
	onSubmit
}) => {
	return (
		<Section margin='m'>
			<SectionHeader text='Features' titleVariant='large' />
			<View marginVertical='m'>
				<Controller
					name='serves_alcohol'
					control={formMethods.control}
					render={({ field: { value } }) => (
						<RadioListItem
							checked={value}
							onPress={() => {
								formMethods.setValue('serves_alcohol', !value);
								onSubmit();
							}}
							icon='alcohol'
							title='Alcohol'
							colorVariant='matt'
							subtitle={[
								{
									variant: 'paragraph-small',
									text: 'If you serve alcohol, you must follow',
									color: 't2'
								},
								{
									variant: 'paragraph-small',
									text: 'our guidelines ',
									color: 't2',
									newline: true
								},
								{
									variant: 'paragraph-small',
									text: 'Learn More',
									color: 'matt',
									underline: true
								}
							]}
						/>
					)}
				/>
				<Controller
					name='serves_food_and_drink'
					control={formMethods.control}
					render={({ field: { value } }) => (
						<RadioListItem
							checked={value}
							onPress={() => {
								formMethods.setValue('serves_food_and_drink', !value);
								onSubmit();
							}}
							icon='cheeseburger'
							title='Food & Drink'
							colorVariant='matt'
							subtitle={[
								{
									variant: 'paragraph-small',
									text: 'Consider adding a ',
									color: 't2'
								},
								{
									variant: 'paragraph-small',
									text: 'Menu',
									color: 'matt',
									underline: true
								}
							]}
						/>
					)}
				/>
				<Controller
					name='has_security'
					control={formMethods.control}
					render={({ field: { value } }) => (
						<RadioListItem
							checked={value}
							onPress={() => {
								formMethods.setValue('has_security', !value);
								onSubmit();
							}}
							icon='security'
							title='Security'
							colorVariant='matt'
							subtitle={[
								{
									variant: 'paragraph-small',
									text: 'You are responsible for security,',
									color: 't2'
								},
								{
									variant: 'paragraph-small',
									text: 'read our ',
									color: 't2',
									newline: true
								},
								{
									variant: 'paragraph-small',
									text: 'Policy',
									color: 'matt',
									underline: true
								}
							]}
						/>
					)}
				/>
				<Controller
					name='pets_allowed'
					control={formMethods.control}
					render={({ field: { value } }) => (
						<RadioListItem
							checked={value}
							onPress={() => {
								formMethods.setValue('pets_allowed', !value);
								onSubmit();
							}}
							icon='dog'
							title='Pet Friendly'
							colorVariant='matt'
							subtitle={[
								{
									variant: 'paragraph-small',
									text: 'Can people bring their pooch? :)',
									color: 't2'
								}
							]}
						/>
					)}
				/>
			</View>
		</Section>
	);
};

export default FeaturesSection;
