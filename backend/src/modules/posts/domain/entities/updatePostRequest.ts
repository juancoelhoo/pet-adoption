export interface UpdatePostRequest {
  id: number;
  name: string;
  breed: string;
  photoUrl: string;
  age: number;
  description: string;
  ownerId: number;
}
