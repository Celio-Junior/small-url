import type { ConfigViewUrls } from '../interfaces/configViewUrls';
import { URL_API } from '../utils/req-api';

export default function viewUrls(element: HTMLElement, url_data: ConfigViewUrls['dataAll']) {
  const table = element.querySelector('table tbody') as HTMLTableSectionElement;
  table.innerHTML = '';
  let tr: HTMLTableRowElement | null;
  let td: HTMLTableCellElement | null;
  url_data.forEach((url_value) => {
    tr = document.createElement('tr');

    const url = `${URL_API}/${url_value.url_hash}`;

    for (const key in url_value) {
      if (key === 'url_hash') continue;

      td = document.createElement('td');
      const value = url_value[key as keyof typeof url_value].toString();

      if (key === 'url_origin') {
        td.classList.add('link-url');
      }
      td.textContent = value;

      tr.appendChild(td);
    }
    td = document.createElement('td');
    td.innerHTML = `
    <div class="buttons-copy-access">
      <a href="${url}" target="_blank" class="button button-register">acessar</a>
      <button class="button button-login">copiar</button>
    </div>
    `;
    const button = td.querySelector('.button-login') as HTMLButtonElement;

    button.addEventListener('click', () => {
      navigator.clipboard.writeText(url);
    });

    tr.appendChild(td);

    table?.appendChild(tr);
  });
}
