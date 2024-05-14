import { ProviderProps } from '@types';
import React from 'react';

type ProviderComponentType = React.ComponentType<ProviderProps>;

function withProvider<T extends {}>(
	ComponentToWrap: React.ComponentType<T>,
	Providers: ProviderComponentType | ProviderComponentType[]
): React.FC<T> {
	const WrappedComponent: React.FC<T> = (props: T) => {
		// Convert Providers to an array if it's not already one
		const providers = Array.isArray(Providers) ? Providers : [Providers];

		// Recursively nest the providers
		const content = providers.reduceRight(
			(children, Provider) => <Provider>{children}</Provider>,
			<ComponentToWrap {...props} />
		);

		return content;
	};

	return WrappedComponent;
}

export default withProvider;
