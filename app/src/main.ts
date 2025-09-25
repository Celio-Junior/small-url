import { navigationLinksElement } from './elements/header';
import { form, urlCopyLinkElement, urlContainerElement } from './elements/home';
import type { ConfigViewUrls } from './interfaces/configViewUrls';
import { changeUrl, pathUrls } from './services/change-url';
import './styles/main.css';

import { requestApi, URL_API } from './utils/req-api';

let url_result: string;
let url_hash: string;

const configViewUrls: ConfigViewUrls = {
  isChangeUrl: true,
  dataAll: [],
};

changeUrl(configViewUrls);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  // history.pushState({ teste: 13 }, '', 'teste');
  const newform = new FormData(e.target as HTMLFormElement);

  const value = newform.get('url_origin') as string;

  if (!value) return;

  try {
    const url = new URL(value);
    if (url.origin === 'null') return;

    // termina isso

    url_hash = (await requestApi('', 'POST', JSON.stringify({ url_origin: url.href }))).url_hash;

    url_result = `${URL_API}/${url_hash}`;

    configViewUrls.isChangeUrl = true;

    if (location.pathname === pathUrls[1]) changeUrl(configViewUrls);

    // element
    if (urlContainerElement.classList.contains('active')) return;
    urlContainerElement.classList.add('active');
  } catch (e) {
    if (e instanceof Error) {
      alert('error com sua url inválida');
      form.reset();
    }
    console.log(e);
  }
});

urlCopyLinkElement.forEach((element) => {
  element?.addEventListener('click', () => {
    if (element.classList.contains('link')) {
      const link = element as HTMLLinkElement;
      link.href = url_result;
    }

    if (element.classList.contains('copy')) {
      navigator.clipboard.writeText(url_result);
    }
  });
});

navigationLinksElement.forEach((linkElement, i) => {
  linkElement.addEventListener('click', async (e) => {
    e.preventDefault();

    if (i === 0) history.pushState(null, 'home', pathUrls[0]);
    if (i === 1) history.pushState(null, 'url mais encurtadas', pathUrls[1]);
    // if (i === 2) history.pushState(null, 'my urls', pathUrls[2]);

    changeUrl(configViewUrls);
  });
});
