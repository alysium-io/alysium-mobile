import { usePersonaAppContext } from '@arch/Application/contexts/Persona.context';
import { ConditionalRenderer } from '@atomic';
import { Persona } from '@types';
import React from 'react';
import HostActionButtons from './ActionButtons.host';
import UserActionButtons from './ActionButtons.user';

const ActionButtons = () => {
	const { personaType } = usePersonaAppContext();

	return (
		<ConditionalRenderer
			componentKey={personaType}
			componentMap={{
				[Persona.host]: HostActionButtons,
				[Persona.user]: UserActionButtons
			}}
		/>
	);
};

export default ActionButtons;
