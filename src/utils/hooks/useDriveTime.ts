import { locationApiSlice } from '@flux/api/location';
import { DriveTimeResponseDto } from '@flux/api/location/dto/get-drive-time.dto';
import { LatLng } from 'react-native-maps';
import { useCurrentLocationContext } from '../contexts';

interface IUseDriveTime {
	driveTime?: DriveTimeResponseDto;
	formattedDriveTime: string | null;
}

const useDriveTime = (destination?: LatLng | null): IUseDriveTime => {
	const { currentLocation } = useCurrentLocationContext();
	const { data: driveTime } = locationApiSlice.useGetDriveTimeQuery(
		{
			query: {
				to_latitude: destination?.latitude || 0,
				to_longitude: destination?.longitude || 0,
				from_latitude: currentLocation?.latitude || 0,
				from_longitude: currentLocation?.longitude || 0
			}
		},
		{
			skip:
				!destination?.latitude ||
				!destination?.latitude ||
				!currentLocation?.latitude ||
				!currentLocation?.longitude
		}
	);

	const getFormattedDriveTimeTo = (): string | null => {
		if (!driveTime) return null;

		if (driveTime.hours === 0 && driveTime.minutes === 0) {
			return 'You are here';
		} else if (driveTime.hours === 0) {
			return `${driveTime.minutes} minutes drive`;
		} else if (driveTime.minutes === 0) {
			return `${driveTime.hours}hr await`;
		} else {
			return `${driveTime.hours}hr ${driveTime.minutes}min away`;
		}
	};

	return {
		driveTime,
		formattedDriveTime: getFormattedDriveTimeTo()
	};
};

export default useDriveTime;
