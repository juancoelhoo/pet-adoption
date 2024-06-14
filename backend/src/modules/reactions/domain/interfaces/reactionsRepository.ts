import { CreateReactionRequest } from "../entities/createReactionRequest";
import { Reaction } from "../entities/reaction";

export interface ReactionsRepository {
  findAll(): Promise<Reaction[]>;
  findOne(id: number): Promise<Reaction | null>;
  create(reaction: CreateReactionRequest): Promise<void>;
  delete(id: number): Promise<void>;
}
