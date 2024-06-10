import { User } from "../entities/user";
import { UsersRepository } from "../interfaces/usersRepository";

export class GetAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }
}
