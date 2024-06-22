export interface CreateComplaintRequest {
    reporterUserId: number;
    reportedPostId: number;
    reason?: string;
  }