import { AddressComponent, AddressType } from '@types';
import useAddressComponents from './useAddressComponents';

type CityAndCountryDisplay = {
	title: string;
	subtitle: string;
};

interface IUseCityAndCountryFromAddressComponents {
	city: AddressComponent | null;
	country: AddressComponent | null;
	cityLongName?: string;
	cityShortName?: string;
	countryLongName?: string;
	countryShortName?: string;
	display: CityAndCountryDisplay;
}

const useCityAndCountryFromAddressComponents = (
	addressComponents?: AddressComponent[]
): IUseCityAndCountryFromAddressComponents => {
	const { getAddressComponent } = useAddressComponents(addressComponents);
	const city = getAddressComponent([
		[AddressType.locality, AddressType.political],
		[AddressType.administrative_area_level_2, AddressType.political],
		[AddressType.administrative_area_level_1, AddressType.political],
		[AddressType.country, AddressType.political]
	]);
	const country = getAddressComponent([
		[AddressType.country, AddressType.political]
	]);
	const cityLongName = city?.long_name;
	const cityShortName = city?.short_name;
	const countryLongName = country?.long_name;
	const countryShortName = country?.short_name;

	return {
		city,
		country,
		cityLongName,
		cityShortName,
		countryLongName,
		countryShortName,
		display: {
			title: cityLongName ?? 'Unknown City',
			subtitle: countryShortName ?? 'Unknown Country'
		}
	};
};

export default useCityAndCountryFromAddressComponents;
