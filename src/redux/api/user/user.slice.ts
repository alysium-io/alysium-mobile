import { rtkBaseUrl, serviceApi } from '../base';
import { CreateUserResponseDto } from './dto/user-create.dto';
import { DeleteUserResponseDto } from './dto/user-delete.dto';
import { PrivateFindOneUserResponseDto } from './dto/user-find-one.dto';
import { LoginUserPhoneNumberBodyDto } from './dto/user-login-phone.dto';
import { LoginResponseDto } from './dto/user-login.dto';
import { RegisterUserPhoneNumberBodyDto } from './dto/user-register-phone.dto';
import {
	UpdateUserBodyDto,
	UpdateUserResponseDto
} from './dto/user-update.dto';

const url = rtkBaseUrl('user');

export default serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		privateFindOneUser: builder.query<PrivateFindOneUserResponseDto, void>({
			query: () => ({
				url: url('/'),
				method: 'GET'
			}),
			providesTags: (result) => (result ? [{ type: 'User', id: 'USER' }] : [])
		}),
		updateUser: builder.mutation<
			UpdateUserResponseDto,
			{ body: UpdateUserBodyDto }
		>({
			query: ({ body }) => ({
				url: url('/'),
				method: 'PUT',
				body
			}),
			invalidatesTags: [{ type: 'User', id: 'USER' }]
		}),
		deleteUser: builder.mutation<DeleteUserResponseDto, void>({
			query: () => ({
				url: url('/'),
				method: 'DELETE'
			}),
			invalidatesTags: [{ type: 'User', id: 'USER' }],
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				await queryFulfilled;
				dispatch(serviceApi.util.resetApiState());
			}
		}),
		registerUserPhoneNumber: builder.query<
			CreateUserResponseDto,
			{ body: RegisterUserPhoneNumberBodyDto }
		>({
			query: ({ body }) => ({
				url: url('/register-phone'),
				method: 'POST',
				body
			})
		}),
		loginUserPhoneNumber: builder.query<
			LoginResponseDto,
			{ body: LoginUserPhoneNumberBodyDto }
		>({
			query: ({ body }) => ({
				url: url('/login-phone'),
				method: 'POST',
				body
			})
		}),
		loginGuestUser: builder.query<LoginResponseDto, void>({
			query: () => ({
				url: url('/login-guest'),
				method: 'POST'
			})
		})
	})
});
