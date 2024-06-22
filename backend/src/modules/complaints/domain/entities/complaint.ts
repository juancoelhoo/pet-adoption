export interface Complaint {
    id: number;
    reporterUserId: number;
    reportedPostId: number;
    createdAt: Date;
    reason?: string;
  }
  