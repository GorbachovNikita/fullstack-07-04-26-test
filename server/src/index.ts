import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { errorHandler } from './middlewares/ErrorHandler';
import { registerRoutes } from './routes/registerRoutes.js';
import { PrismaClient } from '@prisma/client';
import { SERVER } from './config.js';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export const prisma = new PrismaClient();

const app: FastifyInstance = fastify({
   logger: true,
});

const { PORT, CLIENT_URL } = SERVER;

async function startServer() {
   try {
      await app.register(cors, {
         credentials: true,
         origin: CLIENT_URL,
         methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      });

      app.register(swagger, {
         swagger: {
            info: {
               title: 'Fastify API',
               description: 'API documentation for Fastify server',
               version: '1.0.0',
            },
            host: 'localhost:3000',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
         },
      });

      app.register(swaggerUi, {
         routePrefix: '/docs',
      });

      app.setErrorHandler(errorHandler);
      await app.withTypeProvider().register(registerRoutes);

      await app.listen({ port: PORT, host: '0.0.0.0' });
      await prisma.$connect();

      console.log(`Сервер включён на порту ${PORT}`);
   } catch (error) {
      console.error('Ошибка при запуске сервера:', error);
      process.exit(1);
   }
}

startServer();
