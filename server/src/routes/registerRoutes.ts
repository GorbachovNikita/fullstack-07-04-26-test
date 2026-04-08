import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { itemRoutes } from './item.routes';

export const registerRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
   await fastify.register(itemRoutes, { prefix: '/api/items' });
};
