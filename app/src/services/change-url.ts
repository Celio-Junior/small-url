import { containerRoutesElement } from '../elements/home';
import type { ConfigViewUrls } from '../interfaces/configViewUrls';
import { requestApi } from '../utils/req-api';
import viewUrls from './view-urls';

export const pathUrls = ['/', '/short-urls', '/my-urls'];

export const changeUrl = (config: ConfigViewUrls) => {
  const url = location.pathname;

  pathUrls.forEach(async (path, i) => {
    // console.log('teste', containerRoutesElement[i]);
    // if (path !== url) return;
    if (path !== url && containerRoutesElement[i]?.classList.contains('active')) {
      containerRoutesElement[i].classList.remove('active');
    }

    if (path === url && !containerRoutesElement[i].classList.contains('active')) {
      containerRoutesElement[i].classList.add('active');
    }
    if (path !== url) return;

    if (url === pathUrls[1]) {
      if (config.isChangeUrl) {
        config.dataAll = await requestApi('/shorter-urls');
        config.isChangeUrl = false;
      }

      viewUrls(containerRoutesElement[1] as HTMLElement, config.dataAll);
    }
  });
};
