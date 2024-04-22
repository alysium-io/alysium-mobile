import { Section } from '@atomic';
import { useTextInput } from '@hooks';
import { SectionHeader } from '@molecules';
import { EditableAssetImages, EditableDescription } from '@organisms';
import React from 'react';

const AssetsSection = () => {
	const textInput = useTextInput();

	return (
		<Section>
			<SectionHeader margin='m' text='Assets' />
			<EditableDescription
				multiline
				scrollEnabled={false}
				textInputApi={textInput}
				placeholder='Describe this venue using cool words and stuff...'
			/>
			<EditableAssetImages />
		</Section>
	);
};

export default AssetsSection;
