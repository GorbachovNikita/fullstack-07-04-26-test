import { ItemsSort } from '../interfaces/item';
import { prisma } from '../index';

export class ItemService {
   static async getItems(text: string = '', page: number = 1, sort: ItemsSort = { date: 'asc', name: 'asc' }) {
      const take = 30;
      const skip = (page - 1) * take;

      const queryOptions: any = {
         take,
         skip,
         where: { status: 'active' },
         orderBy: [{ name: sort.name }, { createdAt: sort.date }],
      };

      if (text?.trim()?.length > 0) {
         queryOptions.where.name = {
            contains: text.trim(),
            mode: 'insensitive',
         };
      }

      const itemsData = await prisma.item.findMany(queryOptions);
      const totalCount = await prisma.item.count({
         where: queryOptions.where,
      });

      return {
         itemsData,
         totalCount,
      };
   }

   static async createItem(name: string) {
      const item = await prisma.item.create({
         data: {
            name: name,
            status: 'active',
         },
         select: { id: true },
      });
      return {
         id: item.id,
      };
   }

   static async updateItem(name: string, id: number) {
      await prisma.item.update({
         where: { id },
         data: { name: name },
      });
   }

   static async deleteItem(id: number) {
      await prisma.item.update({
         where: { id },
         data: { status: 'archived' },
      });
   }
}
