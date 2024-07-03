import { mock, MockProxy } from 'jest-mock-extended';
import { SequelizeUsersRepository } from '../sequelizeUsersRepository';
import { UserModel } from '../usersModel';
import { CreateUserRequest } from '@src/modules/users/domain/entities/createUserRequest';
import { UpdateUserRequest } from '@src/modules/users/domain/entities/updateUserRequest';
import bcrypt from 'bcrypt';
import { isValidEmail, isValidPassword } from '@src/utils/validators';
import { InvalidParamError } from '@src/infra/api/errors/InvalidParamError';
import { QueryError } from '@src/infra/api/errors/QueryError';

jest.mock('../usersModel');
jest.mock('bcrypt');
jest.mock('@src/utils/validators');

describe('SequelizeUsersRepository', () => {
	let repository: SequelizeUsersRepository;
	let userModelMock: MockProxy<typeof UserModel>;
  
	beforeEach(() => {
	  repository = new SequelizeUsersRepository();
	  userModelMock = mock<typeof UserModel>();
	});
  
	describe('findAll', () => {
	  it('should return all users', async () => {
		(UserModel.findAll as jest.Mock).mockResolvedValue([
		  {
			id: 1,
			name: 'User1',
			email: 'user1@example.com',
			password: 'hashed_password',
			photo_url: 'url',
			description: 'desc',
			address: 'addr',
			phone: 'phone',
			permissions: 0,
		  } as UserModel,
		]);
  
		const result = await repository.findAll();
  
		expect(result).toEqual([
		  {
			id: 1,
			name: 'User1',
			email: 'user1@example.com',
			password: 'hashed_password',
			profilePhoto: 'url',
			description: 'desc',
			address: 'addr',
			phone: 'phone',
			permissions: 0,
		  },
		]);
	  });
  
	  it('should throw a QueryError if an error occurs', async () => {
		(UserModel.findAll as jest.Mock).mockRejectedValue(new Error('Error'));
  
		await expect(repository.findAll()).rejects.toThrow(QueryError);
	  });
  
	  it('should throw a QueryError if an unknown error occurs', async () => {
		(UserModel.findAll as jest.Mock).mockRejectedValue({});
  
		await expect(repository.findAll()).rejects.toThrow(QueryError);
	  });
	});
  
	describe('findOne', () => {
	  it('should return a user if found', async () => {
		(UserModel.findOne as jest.Mock).mockResolvedValue({
		  id: 1,
		  name: 'User1',
		  email: 'user1@example.com',
		  password: 'hashed_password',
		  photo_url: 'url',
		  description: 'desc',
		  address: 'addr',
		  phone: 'phone',
		  permissions: 0,
		} as UserModel);
  
		const result = await repository.findOne(1);
  
		expect(result).toEqual({
		  id: 1,
		  name: 'User1',
		  email: 'user1@example.com',
		  password: 'hashed_password',
		  profilePhoto: 'url',
		  description: 'desc',
		  address: 'addr',
		  phone: 'phone',
		  permissions: 0,
		});
	  });
  
	  it('should return null if no user is found', async () => {
		(UserModel.findOne as jest.Mock).mockResolvedValue(null);
  
		const result = await repository.findOne(1);
  
		expect(result).toBeNull();
	  });
  
	  it('should throw a QueryError if an error occurs', async () => {
		(UserModel.findOne as jest.Mock).mockRejectedValue(new Error('Error'));
  
		await expect(repository.findOne(1)).rejects.toThrow(QueryError);
	  });
  
	  it('should throw a QueryError if an unknown error occurs', async () => {
		(UserModel.findOne as jest.Mock).mockRejectedValue({});
  
		await expect(repository.findOne(1)).rejects.toThrow(QueryError);
	  });
	});
  
	describe('encryptPassword', () => {
	  it('should encrypt a password', async () => {
		const bcryptHashMock = jest.fn().mockResolvedValue('hashed_password');
		(bcrypt.hash as jest.Mock) = bcryptHashMock;
  
		const result = await repository.encryptPassword('password');
  
		expect(bcryptHashMock).toHaveBeenCalledWith('password', 10);
		expect(result).toBe('hashed_password');
	  });
	});
  
	describe('create', () => {
	  it('should create a new user', async () => {
		(isValidEmail as jest.Mock).mockReturnValue(true);
		(isValidPassword as jest.Mock).mockReturnValue(true);
		(bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
		(UserModel.create as jest.Mock).mockResolvedValue({});
  
		const user: CreateUserRequest = {
		  name: 'User1',
		  email: 'user1@example.com',
		  password: 'password',
		  profilePhoto: 'url',
		  description: 'desc',
		  address: 'addr',
		  phone: 'phone',
		  permissions: 0,
		};
  
		await repository.create(user);
  
		expect(UserModel.create).toHaveBeenCalledWith({
		  name: 'User1',
		  email: 'user1@example.com',
		  password: 'hashed_password',
		  photo_url: 'url',
		  description: 'desc',
		  address: 'addr',
		  phone: 'phone',
		  permissions: 0,
		});
	  });
  
	  it('should throw an InvalidParamError for an invalid email', async () => {
		(isValidEmail as jest.Mock).mockReturnValue(false);
  
		const user: CreateUserRequest = {
		  name: 'User1',
		  email: 'invalid-email',
		  password: 'password',
		  profilePhoto: 'url',
		  description: 'desc',
		  address: 'addr',
		  phone: 'phone',
		  permissions: 0,
		};
  
		await expect(repository.create(user)).rejects.toThrow(InvalidParamError);
	  });
  
	  it('should throw an InvalidParamError for an invalid password', async () => {
		(isValidEmail as jest.Mock).mockReturnValue(true);
		(isValidPassword as jest.Mock).mockReturnValue(false);
  
		const user: CreateUserRequest = {
		  name: 'User1',
		  email: 'user1@example.com',
		  password: 'invalid-password',
		  profilePhoto: 'url',
		  description: 'desc',
		  address: 'addr',
		  phone: 'phone',
		  permissions: 0,
		};
  
		await expect(repository.create(user)).rejects.toThrow(InvalidParamError);
	  });
  
	  it('should throw a QueryError if an error occurs', async () => {
		(isValidEmail as jest.Mock).mockReturnValue(true);
		(isValidPassword as jest.Mock).mockReturnValue(true);
		(bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
		(UserModel.create as jest.Mock).mockRejectedValue(new Error('Error'));
  
		const user: CreateUserRequest = {
		  name: 'User1',
		  email: 'user1@example.com',
		  password: 'password',
		  profilePhoto: 'url',
		  description: 'desc',
		  address: 'addr',
		  phone: 'phone',
		  permissions: 0,
		};
  
		await expect(repository.create(user)).rejects.toThrow(QueryError);
	  });
  
	  it('should throw a QueryError if an unknown error occurs', async () => {
		(isValidEmail as jest.Mock).mockReturnValue(true);
		(isValidPassword as jest.Mock).mockReturnValue(true);
		(bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
		(UserModel.create as jest.Mock).mockRejectedValue({});
  
		const user: CreateUserRequest = {
		  name: 'User1',
		  email: 'user1@example.com',
		  password: 'password',
		  profilePhoto: 'url',
		  description: 'desc',
		  address: 'addr',
		  phone: 'phone',
		  permissions: 0,
		};
  
		await expect(repository.create(user)).rejects.toThrow(QueryError);
	  });
	});
  
	describe('update', () => {
	  it('should update a user', async () => {
		(bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
		(UserModel.update as jest.Mock).mockResolvedValue([1]);
  
		const user: Omit<UpdateUserRequest, 'id' | 'email'> = {
		  name: 'Updated User',
		  password: 'password',
		  profilePhoto: 'url',
		  description: 'desc',
		  address: 'addr',
		  phone: 'phone',
		  permissions: 0,
		};
  
		await repository.update(1, user);
  
		expect(UserModel.update).toHaveBeenCalledWith(
		  {
			name: 'Updated User',
			password: 'hashed_password',
			photo_url: 'url',
			description: 'desc',
			address: 'addr',
			phone: 'phone',
			permissions: 0,
		  },
		  { where: { id: 1 } }
		);
	  });
  
	  it('should throw a QueryError if an error occurs', async () => {
		(UserModel.update as jest.Mock).mockRejectedValue(new Error('Error'));
  
		const user: Omit<UpdateUserRequest, 'id' | 'email'> = {
		  name: 'Updated User',
		  password: 'password',
		  profilePhoto: 'url',
		  description: 'desc',
		  address: 'addr',
		  phone: 'phone',
		  permissions: 0,
		};
  
		await expect(repository.update(1, user)).rejects.toThrow(QueryError);
	  });
  
	  it('should throw a QueryError if an unknown error occurs', async () => {
		(UserModel.update as jest.Mock).mockRejectedValue({});
  
		const user: Omit<UpdateUserRequest, 'id' | 'email'> = {
		  name: 'Updated User',
		  password: 'password',
		  profilePhoto: 'url',
		  description: 'desc',
		  address: 'addr',
		  phone: 'phone',
		  permissions: 0,
		};
  
		await expect(repository.update(1, user)).rejects.toThrow(QueryError);
	  });
	});
  
	describe('delete', () => {
	  it('should delete a user', async () => {
		(UserModel.destroy as jest.Mock).mockResolvedValue(1);
  
		await repository.delete(1);
  
		expect(UserModel.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
	  });
  
	  it('should throw a QueryError if an error occurs', async () => {
		(UserModel.destroy as jest.Mock).mockRejectedValue(new Error('Error'));
  
		await expect(repository.delete(1)).rejects.toThrow(QueryError);
	  });
  
	  it('should throw a QueryError if an unknown error occurs', async () => {
		(UserModel.destroy as jest.Mock).mockRejectedValue({});
  
		await expect(repository.delete(1)).rejects.toThrow(QueryError);
	  });
	});
  });