import { CreateUserRequest } from "../entities/createUserRequest";
import { UsersRepository } from "../interfaces/usersRepository";

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: CreateUserRequest): Promise<void> {
    request.permissions = 0;
    request.address = "Edite seu endereço";
    request.profilePhoto = "https://i.imgur.com/tmUa2ir.png";
    request.phone = "Edite seu numero de celular";
    request.description = "Edite sua descrição";

    await this.usersRepository.create(request);
  }
}
