import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
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
import { LoginBodyDto, LoginResponseDto } from './dto/user-login.dto';
import { GetMeResponseDto } from './dto/user-me.dto';
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
			query: (body) => ({
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
		})
	})
});

export default apiSlice;
