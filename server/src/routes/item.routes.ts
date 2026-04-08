import type { FastifyInstance } from 'fastify';
import ItemController from '../controllers/item.controller';

export const itemRoutes = (fastify: FastifyInstance) => {
   fastify.get(
      '/',
      {
         schema: {
            description: 'Получить список записей',
            tags: ['items'],
            querystring: {
               type: 'object',
               properties: {
                  text: { type: 'string', description: 'Поисковой запрос' },
                  page: { type: 'number', description: 'Страница списка записей' },
                  'sort[name]': {
                     type: 'string',
                     description: 'Сортировка по названию записи (приоритетно)',
                  },
                  'sort[date]': {
                     type: 'string',
                     description: 'Сортировка по дате добавления записи',
                  },
               },
            },
            response: {
               200: {
                  description: 'Результат запроса записей',
                  type: 'object',
                  properties: {
                     itemsData: {
                        type: 'array',
                        items: {
                           type: 'object',
                           properties: {
                              id: {
                                 type: 'number',
                                 description: 'ID записи',
                                 example: 1,
                              },
                              name: {
                                 type: 'string',
                                 description: 'Название записи',
                                 example: 'Название',
                              },
                              status: {
                                 type: 'string',
                                 description: 'Статус записи',
                                 example: 'active',
                              },
                              createdAt: {
                                 type: 'string',
                                 description: 'Время создания записи',
                                 example: '2026-04-07T15:12:27.994Z',
                              },
                           },
                        },
                        minItems: 0,
                     },
                     totalCount: { type: 'number', description: 'Общее количество записей', example: 1 },
                  },
               },
            },
         },
      },
      ItemController.getItems
   );

   fastify.post(
      '/',
      {
         schema: {
            description: 'Создать новую запись',
            tags: ['items'],
            body: {
               type: 'object',
               properties: {
                  name: {
                     type: 'string',
                     maxLength: 100,
                     description: 'Название новой записи',
                  },
               },
            },
            response: {
               201: {
                  description: 'Запись успешно создана',
                  type: 'object',
                  properties: {
                     id: { type: 'number', description: 'ID новой записи', example: 1 },
                  },
               },
            },
         },
      },
      ItemController.createItem
   );

   fastify.put(
      '/:id',
      {
         schema: {
            description: 'Обновить запись',
            tags: ['items'],
            params: {
               type: 'object',
               properties: {
                  id: { type: 'number', description: 'ID обновляемой записи' },
               },
            },
            body: {
               type: 'object',
               properties: {
                  name: {
                     type: 'string',
                     maxLength: 100,
                     description: 'Название обновляемой записи',
                  },
               },
            },
            response: {
               204: { description: 'Запись успешно обновлена', example: '' },
            },
         },
      },
      ItemController.updateItem
   );

   fastify.delete(
      '/:id',
      {
         schema: {
            description: 'Удалить запись',
            tags: ['items'],
            params: {
               type: 'object',
               properties: {
                  id: { type: 'number', description: 'ID удаляемой записи' },
               },
            },
            response: {
               204: { description: 'Запись успешно удалена', example: '' },
            },
         },
      },
      ItemController.deleteItem
   );
};
