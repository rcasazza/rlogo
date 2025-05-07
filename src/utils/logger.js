const isDev = import.meta.env.MODE !== 'production';

export const log = (...args) => {
  if (isDev) console.log(...args);
};

export const warn = (...args) => {
  if (isDev) console.warn(...args);
};

export const error = (...args) => {
  if (isDev) console.error(...args);
};
