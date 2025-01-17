import {
	AddressComponent,
	AddressType,
	GeocodingAddressComponentType
} from '@types';

type AddressComponentType = AddressType | GeocodingAddressComponentType;

interface IUseAddressComponents {
	getAddressComponent: (
		type:
			| AddressComponentType
			| AddressComponentType[]
			| AddressComponentType[][]
	) => AddressComponent | null;
}

const useAddressComponents = (
	addressComponents?: AddressComponent[]
): IUseAddressComponents => {
	const getAddressComponent = (
		type:
			| AddressComponentType
			| AddressComponentType[]
			| AddressComponentType[][]
	): AddressComponent | null => {
		if (!addressComponents) return null;

		// Handle single type
		if (!Array.isArray(type)) {
			return (
				addressComponents.find((component) =>
					component.types.includes(type as AddressType)
				) || null
			);
		}

		// Handle 1D array of types
		if (!Array.isArray(type[0])) {
			return (
				addressComponents.find((component) =>
					(type as AddressComponentType[]).every((t) =>
						component.types.includes(t as AddressType)
					)
				) || null
			);
		}

		// Handle 2D array of type combinations
		for (const combination of type as AddressComponentType[][]) {
			const match = addressComponents.find((component) =>
				combination.every((t) => component.types.includes(t as AddressType))
			);
			if (match) return match;
		}

		return null;
	};

	return {
		getAddressComponent
	};
};

export default useAddressComponents;
