import { Sequelize } from "sequelize-typescript";

import { PostModel } from "@src/infra/services/sequelize/posts/postModel";
import { UserModel } from "@src/infra/services/sequelize/users/usersModel";
import { ComplaintModel } from "@src/infra/services/sequelize/complaints/complaintsModel";
import { ReactionModel } from "@src/infra/services/sequelize/reactions/reactionModel";

export async function setupDb() {
    const sequelize: Sequelize = new Sequelize(
      String(process.env.DATABASE_URL),
      { logging: false }
    );

    await sequelize.addModels([
      ComplaintModel,
      UserModel,
      PostModel,
      ReactionModel
    ]);

    await sequelize.sync();
}
