import { Example } from "../entities/example";
import { ExamplesRepository } from "../interfaces/examplesRepository";

export class GetAllExamplesUseCase {
  constructor(private examplesRepository: ExamplesRepository) {}

  async execute(): Promise<Example[]> {
    return await this.examplesRepository.findAll();
  }
}
