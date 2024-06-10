import { CreateUserRequest } from "../entities/createUserRequest";
import { UsersRepository } from "../interfaces/usersRepository";

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: CreateUserRequest): Promise<void> {
    await this.usersRepository.create(request);
  }
}
