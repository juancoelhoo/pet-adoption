import { ComplaintsRepository } from "@src/modules/complaints/domain/interfaces/complaintsRepository";
import { Complaint } from "@src/modules/complaints/domain/entities/complaint";
import { CreateComplaintRequest } from "@src/modules/complaints/domain/entities/createComplaintRequest";
import { UpdateComplaintRequest } from "@src/modules/complaints/domain/entities/updateComplaintRequest";
import { ComplaintModel } from "./complaintsModel";
import { QueryError } from "@src/infra/api/errors/QueryError";
import { UserModel } from "../users/usersModel";

export class SequelizeComplaintsRepository implements ComplaintsRepository {
  async findAll(): Promise<Complaint[]> {
    try {
      const complaints: ComplaintModel[] = await ComplaintModel.findAll({
        include: {all: true},
      });

      return complaints.map(complaint => ({
        id: complaint.id,
        reporterUserId: complaint.reporter_user_id,
        reportedPostId: complaint.reported_post_id,
        createdAt: complaint.created_at,
        reason: complaint.reason,
        reporter: {
          id: complaint.reporterUser.id,
          name: complaint.reporterUser.name,
          email: complaint.reporterUser.email,
          password: complaint.reporterUser.password,
          profilePhoto: complaint.reporterUser.photo_url,
          description: complaint.reporterUser.description,
          address: complaint.reporterUser.address,
          phone: complaint.reporterUser.phone,
          permissions: complaint.reporterUser.permissions
        },
        post: {
          id: complaint.reportedPost.id,
          name: complaint.reportedPost.name,
          description: complaint.reportedPost.description,
          breed: complaint.reportedPost.breed,
          age: complaint.reportedPost.age,
          photoUrl: complaint.reportedPost.photo_url,
          ownerId: complaint.reportedPost.owner_id,
          createdAt: complaint.reportedPost.created_at
        }
      }));
    } catch (error) {
      if (error instanceof Error) {
        throw new QueryError("Error in listing complaints: " + error.message);
      } else {
        throw new QueryError("Unknown error in listing complaints");
      }
    }
  }

  async findOne(id: number): Promise<Complaint | null> {
    try {
      const complaint = await ComplaintModel.findOne({
        where: {
          id: id
        }
      });

      if (complaint == null) return null;

      return {
        id: complaint.id,
        reporterUserId: complaint.reporter_user_id,
        reportedPostId: complaint.reported_post_id,
        createdAt: complaint.created_at,
        reason: complaint.reason,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new QueryError("Error in listing specific complaint: " + error.message);
      } else {
        throw new QueryError("Unknown error in listing specific complaint");
      }
    }
  }

  async create(complaint: CreateComplaintRequest): Promise<void> {
    try {
      await ComplaintModel.create({
        reporter_user_id: complaint.reporterUserId,
        reported_post_id: complaint.reportedPostId,
        reason: complaint.reason,
        created_at: new Date() // Define como a data atual
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new QueryError("Error in creating complaint: " + error.message);
      } else {
        throw new QueryError("Unknown error in creating complaint");
      }
    }
  }

  async update(id: number, complaint: UpdateComplaintRequest): Promise<void> {
    try {
      await ComplaintModel.update(
        {
          reason: complaint.reason
        },
        {
          where: {
            id: id
          }
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new QueryError("Error in updating complaint: " + error.message);
      } else {
        throw new QueryError("Unknown error in updating complaint");
      }
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await ComplaintModel.destroy({
        where: {
          id: id
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new QueryError("Error in deleting complaint: " + error.message);
      } else {
        throw new QueryError("Unknown error in deleting complaint");
      }
    }
  }
}
