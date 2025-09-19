import './styles/main.css';

const form = document.querySelector('#form') as HTMLFormElement;
let url_result: string;
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newform = new FormData(form);

  const value = newform.get('url_origin') as string;
  if (!value) return;

  try {
    const url = new URL(value);
    const response = await fetch('http://localhost:4000/small-url', {
      method: 'POST',
      body: JSON.stringify({ url_origin: url.href }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { url_hash } = await response.json();
    url_result = `http://localhost:4000/small-url/${url_hash}`;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
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
