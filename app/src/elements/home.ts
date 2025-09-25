export const form = document.querySelector('#form') as HTMLFormElement;
export const urlContainerElement = document.querySelector('.url-encurt') as HTMLDivElement;
export const urlCopyLinkElement = ['.copy', '.link'].map((value) =>
  document.querySelector(`.url-encurt ${value}`),
);

export const containerRoutesElement = (
  document.querySelector('.container.container-change') as HTMLDivElement
).children;
