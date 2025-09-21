import './styles/main.css';

import { requestApi } from './utils/req-api';

const form = document.querySelector('#form') as HTMLFormElement;
const url_encurtElement = document.querySelector('.url-encurt') as HTMLDivElement;

const URL_API = 'http://localhost:4000/small-url';

const url_page = './src/pages/more-encurtadas.html';

const result = await (await fetch(url_page)).text();

console.log('result:\n', result);

let url_result: string;
let url_hash: string;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newform = new FormData(e.target as HTMLFormElement);

  const value = newform.get('url_origin') as string;

  if (!value) return;

  try {
    const url = new URL(value);
    if (url.origin === 'null') return;

    // termina isso
    console.log(url.href);
    url_hash = await requestApi(`${URL_API}`, JSON.stringify({ url_origin: url.href }));

    url_result = `${URL_API}/${url_hash}`;

    // element
    if (url_encurtElement.classList.contains('active')) return;
    url_encurtElement.classList.add('active');
  } catch (e) {
    if (e instanceof Error) {
      alert('error com sua url inválida');
      form.reset();
    }
    console.log(e);
  }
});

const url_encurt = ['.copy', '.link'].map((value) => document.querySelector(`.url-encurt ${value}`));

url_encurt.forEach((element) => {
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
