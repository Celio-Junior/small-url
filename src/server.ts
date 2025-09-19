import fastify from 'fastify';
import fastifyFormbody from '@fastify/formbody';
import urlRoute from './routes/url.js';
import fastifyCors from '@fastify/cors';
type ListenType = (err?: null | Error, address?: string) => void;
export default class App {
  private server: fastify.FastifyInstance = fastify();

  constructor() {
    this.middlewares();
    this.render();
    this.routes();
  }

  public listen(port: number, callback: ListenType) {
    this.server.listen({ port }, callback);
  }
  private middlewares(): void {
    this.server.register(fastifyFormbody);
    this.server.register(fastifyCors, {
      origin: '*',
    });
  }
  private render(): void {}

  private routes(): void {
    this.server.register(urlRoute, {
      prefix: '/small-url',
    });
  }
}
