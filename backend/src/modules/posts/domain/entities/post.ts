import { User } from "@src/modules/users/domain/entities/user";

export interface Post {
  id: number;
  name: string;
  breed: string;
  photoUrl: string;
  age: number;
  description: string;
  ownerId: number;
  createdAt: Date;
  owner?: User;
}
