import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
   request.log.error({ error }, 'Request processing failed');
   if (reply.sent) return;

   let status = error.statusCode ?? 500;
   let message: string;

   if (error.code === 'FST_ERR_VALIDATION' && error.validation && Array.isArray(error.validation)) {
      status = 400;
      message = error.validation.map((v) => v.message).join(', ');
   } else if ('errorText' in error && typeof error.errorText === 'string') {
      message = error.errorText;
   } else if (error.message && status < 500) {
      message = error.message;
   } else {
      message = 'Internal server error';
   }

   reply.status(status).send({ success: false, error: message, requestId: request.id });
}
