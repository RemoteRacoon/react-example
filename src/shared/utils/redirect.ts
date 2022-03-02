import Router from 'next/router';
import { NextPageContext } from 'next';

const redirect = (target: string, ctx?: NextPageContext) => {
  if (ctx) {
    ctx.res.writeHead(303, { ...ctx.res.getHeaders(), Location: target });
    ctx.res.end();
    return;
  } if (Router.asPath) {
    Router.replace(target);
  }
};

export default redirect;