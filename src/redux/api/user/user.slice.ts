import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import { ContinueUserPhoneNumberBodyDto } from './dto/user-continue-phone.dto';
import {
	CreateUserBodyDto,
	CreateUserResponseDto
} from './dto/user-create.dto';
import { DeleteUserResponseDto } from './dto/user-delete.dto';
import { FindAllUsersResponseDto } from './dto/user-find-all.dto';
import {
	FindOneUserParamsDto,
	FindOneUserResponseDto
} from './dto/user-find-one.dto';
import { LoginUserPhoneNumberBodyDto } from './dto/user-login-phone.dto';
import { LoginBodyDto, LoginResponseDto } from './dto/user-login.dto';
import { GetMeResponseDto } from './dto/user-me.dto';
import { RegisterUserPhoneNumberBodyDto } from './dto/user-register-phone.dto';
import {
	UpdateUserBodyDto,
	UpdateUserResponseDto
} from './dto/user-update.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/user' }),
	reducerPath: 'userApi',
	tagTypes: ['User'],
	endpoints: (builder) => ({
		findOne: builder.query<
			FindOneUserResponseDto,
			{ params: FindOneUserParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.user_id}`,
				method: 'GET'
			})
		}),
		findAll: builder.query<FindAllUsersResponseDto[], void>({
			query: () => ({
				url: '/',
				method: 'GET'
			})
		}),
		create: builder.mutation<
			CreateUserResponseDto,
			{ body: CreateUserBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'POST',
				body
			})
		}),
		update: builder.mutation<
			UpdateUserResponseDto,
			{ body: UpdateUserBodyDto }
		>({
			query: (body) => ({
				url: '/',
				method: 'PUT',
				body
			})
		}),
		delete: builder.mutation<DeleteUserResponseDto, void>({
			query: () => ({
				url: '/',
				method: 'DELETE'
			})
		}),
		me: builder.query<GetMeResponseDto, void>({
			query: () => ({
				url: '/',
				method: 'GET'
			})
		}),
		login: builder.query<LoginResponseDto, { body: LoginBodyDto }>({
			query: ({ body }) => ({
				url: '/login',
				method: 'POST',
				body
			})
		}),
		registerPhoneNumber: builder.query<
			LoginResponseDto,
			{ body: RegisterUserPhoneNumberBodyDto }
		>({
			query: ({ body }) => ({
				url: '/register-phone',
				method: 'POST',
				body
			})
		}),
		continuePhoneNumber: builder.query<
			LoginResponseDto,
			{ body: ContinueUserPhoneNumberBodyDto }
		>({
			query: ({ body }) => ({
				url: '/continue-phone',
				method: 'POST',
				body
			})
		}),
		loginPhoneNumber: builder.query<
			LoginResponseDto,
			{ body: LoginUserPhoneNumberBodyDto }
		>({
			query: ({ body }) => ({
				url: '/login-phone',
				method: 'POST',
				body
			})
		})
	})
});

export default apiSlice;
