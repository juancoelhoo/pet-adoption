import { Example } from "@src/modules/examples/domain/entities/example";
import { ExamplesRepository } from "@src/modules/examples/domain/interfaces/examplesRepository";

export class SequelizeExamplesRepository implements ExamplesRepository {
  async findAll(): Promise<Example[]> {
    return [
      {
        id: "1904137810",
        description: "First Example",
      },
      {
        id: "0397141701",
        description: "Second Example",
      },
      {
        id: "9381698101",
        description: "Third Example",
      },
    ];
  }
}
