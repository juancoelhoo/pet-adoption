import { UpdateUser } from "../entities/updateUser";
import { UsersRepository } from "../interfaces/usersRepository";

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: number, user: Omit<UpdateUser, 'id' | 'email'>): Promise<void> {
    // Chame o método de atualização no repositório com o ID e os novos dados do usuário
    await this.usersRepository.update(id, user);
  }
}
