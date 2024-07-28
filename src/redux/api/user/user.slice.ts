import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import { ContinueUserPhoneNumberBodyDto } from './dto/user-continue-phone.dto';
import { PrivateFindOneUserResponseDto } from './dto/user-find-one.dto';
import { LoginUserPhoneNumberBodyDto } from './dto/user-login-phone.dto';
import { LoginResponseDto } from './dto/user-login.dto';
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
		privateFindOne: builder.query<PrivateFindOneUserResponseDto, void>({
			query: () => ({
				url: '/',
				method: 'GET'
			}),
			providesTags: (result) => (result ? [{ type: 'User', id: 'USER' }] : [])
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
