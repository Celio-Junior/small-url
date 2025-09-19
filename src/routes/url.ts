import type { FastifyInstance } from 'fastify';

import urlController from './../controllers/Url.js';

export default function urlRoute(fastify: FastifyInstance) {
  fastify.post('/', urlController.create.bind(urlController));

  fastify.get('/:url_hash', urlController.show.bind(urlController));
}
