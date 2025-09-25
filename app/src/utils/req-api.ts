export const URL_API = 'http://localhost:4000/small-url';
export const requestApi = async (
  pathUrl: string = '',
  method: 'GET' | 'POST' = 'GET',
  body: string | null = null,
) => {
  const url = await (
    await fetch(URL_API.concat(pathUrl).trim(), {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

  return url;
};
