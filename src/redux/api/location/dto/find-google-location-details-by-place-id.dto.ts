import { Location } from '../location.entity';

export interface FindGoogleLocationDetailsByPlaceIdBodyDto {
	place_id: string;
}

export interface FindGoogleLocationDetailsByPlaceIdResponseDto
	extends Location {}
