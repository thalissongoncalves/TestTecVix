import { prisma } from "../database/client";
import { TQuery } from "../types/validations/Queries/queryListAll";
import { TUserCreated } from "../types/validations/User/createUser";

export class UserModel {
  async totalCount(query: TQuery, isIncludeDeleted?: boolean) {
    return prisma.user.count({
      where: {
        ...(!isIncludeDeleted && { deletedAt: null }),
        isActive: query.isActive,
        username: {
          contains: query.search,
        },
      },
    });
  }

  async listAll(query: TQuery, isIncludeDeleted?: boolean) {
    const limit = query.limit || 0;
    const skip = query.page ? query.page * limit : query.offset || 0;
    const orderBy =
      query.orderBy?.map(({ field, direction }) => ({
        [field]: direction,
      })) || [];

    const totalCount = await this.totalCount(query, isIncludeDeleted);
    return {
      totalCount,
      result: await prisma.user.findMany({
        where: {
          ...(!isIncludeDeleted && { deletedAt: null }),
          isActive: query.isActive,
          username: {
            contains: query.search,
          },
        },
        take: limit || undefined,
        skip,
        ...(orderBy.length
          ? { orderBy }
          : { orderBy: [{ updatedAt: "desc" }] }),
        select: {
          idUser: true,
          username: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    };
  }

  async createNewUser(data: TUserCreated) {
    return prisma.user.create({
      data,
      select: {
        idUser: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getById(idUser: string) {
    return prisma.user.findFirst({
      where: {
        idUser,
        deletedAt: null
      },
      select: {
        idUser: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }
}
