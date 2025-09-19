import type { UrlModelType } from './url.js';

export type UrlRequestType = {
  Body: Pick<UrlModelType, 'url_origin'>;
};
