import { UsersRepository } from "../interfaces/usersRepository";

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: number): Promise<void> {
    // TODO: Add verification if it is not in use

    await this.usersRepository.delete(id);
  }
}
