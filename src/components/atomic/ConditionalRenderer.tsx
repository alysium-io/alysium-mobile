import React from 'react';

interface ComponentMap {
	[key: string]: React.ComponentType<any>;
}

interface ConditionalRendererProps {
	componentMap: ComponentMap;
	componentKey: keyof ComponentMap;
	DefaultComponent?: React.ComponentType<any>;
}

// Define the ConditionalRenderer component
const ConditionalRenderer: React.FC<ConditionalRendererProps> = ({
	componentMap,
	componentKey,
	DefaultComponent = null
}) => {
	if (!componentMap[componentKey]) {
		return DefaultComponent ? <DefaultComponent /> : null;
	}

	const ComponentToRender = componentMap[componentKey];
	return <ComponentToRender />;
};

export default ConditionalRenderer;
