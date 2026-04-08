import { FastifyReply, FastifyRequest } from 'fastify';
import { ItemService } from '../services/item.service';
import { GetItemsQuery } from '../interfaces/item';

class ItemController {
   static getItems = async (request: FastifyRequest<{ Querystring: GetItemsQuery }>, reply: FastifyReply) => {
      const { text, page } = request.query;
      const sort = {
         date: request?.query?.['sort[date]'],
         name: request?.query?.['sort[name]'],
      };
      const itemsData = await ItemService.getItems(text, page, sort);
      return reply.send(itemsData);
   };

   static createItem = async (request: FastifyRequest<{ Body: { name: string } }>, reply: FastifyReply) => {
      const { name } = request.body;
      const itemData = await ItemService.createItem(name);
      return reply.status(201).send(itemData);
   };

   static updateItem = async (
      request: FastifyRequest<{
         Params: { id: string };
         Body: { name: string };
      }>,
      reply: FastifyReply
   ) => {
      const { id } = request.params;
      const { name } = request.body;
      await ItemService.updateItem(name, parseInt(id, 10));
      return reply.status(204).send();
   };

   static deleteItem = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const { id } = request.params;
      await ItemService.deleteItem(parseInt(id, 10));
      return reply.status(204).send();
   };
}

export default ItemController;
