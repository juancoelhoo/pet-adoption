import { Complaint } from "../entities/complaint";
import { CreateComplaintRequest } from "../entities/createComplaintRequest";
import { UpdateComplaintRequest } from "../entities/updateComplaintRequest";

export interface ComplaintsRepository {
  findAll(): Promise<Complaint[]>;
  findOne(id: number): Promise<Complaint | null>;
  create(complaint: CreateComplaintRequest): Promise<void>;
  update(id: number, complaint: UpdateComplaintRequest): Promise<void>;
  delete(id: number): Promise<void>;
}
