import { NextPageContext } from 'next';
import { Cookies } from 'react-cookie';


const cookies = (ctx?: NextPageContext) => {
  if (!process.browser && !ctx) return null;

  const cookies = process.browser
    ? new Cookies(document.cookie)
    : new Cookies(ctx.req.headers.cookie);

  return cookies;
};

export default cookies;
