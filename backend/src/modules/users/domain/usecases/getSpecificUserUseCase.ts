import { User } from "../entities/user";
import { UsersRepository } from "../interfaces/usersRepository";

export class GetSpecificUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new Error("This user does not exist!");

    return user;
  }
}
