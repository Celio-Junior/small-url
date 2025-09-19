import { URL } from 'node:url';
import { randomUUID } from 'node:crypto';
import type { FastifyRequest, FastifyReply } from 'fastify';

import type { UrlRequestType } from '../interface/urlRequest.js';
import UrlModel from '../model/Url.js';
import randomNumber from '../utils/random.js';

class UrlController {
  private urlModel: UrlModel;
  constructor() {
    this.urlModel = new UrlModel();
  }

  create(request: FastifyRequest<UrlRequestType>, reply: FastifyReply) {
    const { url_origin } = request.body;

    try {
      const { href } = new URL(url_origin);
      // let count: number;
      const [url_exists] = this.urlModel.findBy({
        where: {
          url_origin: href,
        },
      });

      if (url_exists) {
        this.urlModel.update(
          {
            count: ++url_exists.count,
          },
          {
            url_origin: url_exists.url_origin,
            url_hash: url_exists.url_hash,
          },
        );
        const [urlsearched] = this.urlModel.findBy({
          where: {
            url_origin: url_exists.url_origin,
            url_hash: url_exists.url_hash,
          },
        });

        return reply.status(200).send({ url_hash: urlsearched?.url_hash });
      }

      const url_hash = randomUUID().slice(0, randomNumber(5, 8));

      this.urlModel.create({ url_origin: href, url_hash, count: 1 });

      return reply.status(200).send({ url_hash });
    } catch (e) {
      if (!(e instanceof Error)) return;
      reply.status(400).send(e.message);
      console.log(e);
    }
  }

  show(
    request: FastifyRequest<{
      Params: {
        url_hash: string;
      };
    }>,
    reply: FastifyReply,
  ) {
    const { url_hash } = request.params;

    const [url_exists] = this.urlModel.findBy({
      where: {
        url_hash,
      },
    });
    if (!url_exists) return reply.status(400).send({ error: 'não existe essa url' });

    reply.redirect(url_exists.url_origin);
  }
}

export default new UrlController();
//curl -X POST "http://localhost:4000/small-url" --data '{"urlOrigin": "123456celio"}'
