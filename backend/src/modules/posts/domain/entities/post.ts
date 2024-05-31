export interface Post {
  id: number;
  name: string;
  breed: string;
  photoUrl: string;
  age: number;
  description: string;
  ownerId: number;
  // owner: User;
  createdAt: Date;
}
