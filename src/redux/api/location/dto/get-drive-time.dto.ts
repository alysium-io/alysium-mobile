export interface DriveTimeQueryDto {
	from_latitude: number;
	from_longitude: number;
	to_latitude: number;
	to_longitude: number;
}

export interface DriveTimeResponseDto {
	hours: number;
	minutes: number;
}
