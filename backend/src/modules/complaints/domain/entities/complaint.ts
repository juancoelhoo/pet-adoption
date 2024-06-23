import { Post } from "@src/modules/posts/domain/entities/post";
import { User } from "@src/modules/users/domain/entities/user";

export interface Complaint {
  id: number;
  reporterUserId: number;
  reportedPostId: number;
  createdAt: Date;
  reason?: string;
  reporter?: User;
  post?: Post;
}
  