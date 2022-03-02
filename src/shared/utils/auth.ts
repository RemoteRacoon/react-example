import { NextPageContext } from 'next';
import cookies from 'shared/utils/cookies';
import { serialize } from 'cookie';

export const getToken = (ctx?: NextPageContext) => {
  const cks = cookies(ctx);

  return cks && cks.get('token');
};

export const removeAuth = (ctx?: NextPageContext) => {
  if (ctx) {
    ctx.res.setHeader('Set-Cookie', [
      serialize('token', '', { maxAge: -1, path: '/' }),
    ]);

    return;
  }

  const cks = cookies();

  if (cks) {
    cks.remove('token', { path: '/', maxAge: -1 });
  }
};
