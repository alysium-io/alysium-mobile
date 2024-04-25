import React from 'react';

interface ComponentMap {
	[key: string]: React.ComponentType<any>;
}

interface ConditionalRendererProps {
	componentMap: ComponentMap;
	componentKey: keyof ComponentMap;
}

// Define the ConditionalRenderer component
const ConditionalRenderer: React.FC<ConditionalRendererProps> = ({
	componentMap,
	componentKey
}) => {
	const ComponentToRender = componentMap[componentKey];
	return <ComponentToRender />;
};

export default ConditionalRenderer;
