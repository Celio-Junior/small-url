export const requestApi = async (url: string, body: string) => {
  const { url_hash } = await (
    await fetch(url, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

  return url_hash;
};
