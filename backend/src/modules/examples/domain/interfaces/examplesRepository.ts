import { Example } from "../entities/example";

export interface ExamplesRepository {
  findAll(): Promise<Example[]>;
}
