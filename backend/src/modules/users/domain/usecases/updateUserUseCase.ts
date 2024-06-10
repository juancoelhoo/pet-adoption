import { UpdateUserRequest } from "../entities/updateUserRequest";
import { UsersRepository } from "../interfaces/usersRepository";

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: UpdateUserRequest): Promise<void> {
    await this.usersRepository.update(request.id, request);
  }
}
