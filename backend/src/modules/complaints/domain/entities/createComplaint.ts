export interface CreateComplaint {
    reporterUserId: number;
    reportedPostId: number;
    reason?: string;
  }