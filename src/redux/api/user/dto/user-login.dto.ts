export interface LoginBodyDto {
	email: string;
	password: string;
}

export interface LoginResponseDto {
	token: string;
}
