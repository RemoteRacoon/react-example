/* eslint-disable indent */
import axios, { AxiosError, AxiosResponse, Method } from 'axios';
import { NextPageContext } from 'next';
import { getToken, removeAuth } from 'shared/utils/auth';
import downloadFileFromHeaders from 'shared/utils/downloadFile';
import env from 'shared/utils/env';
import redirect from 'shared/utils/redirect';
import { objectToQueryString } from '../url';

const defaults = {
  baseURL: `${env.server}/api`,
  headers: (ctx?: NextPageContext) => ({
    Authorization: getToken(ctx) ? `Bearer ${getToken(ctx)}` : '',
  }),
  error: {
    code: 'INTERNAL_ERROR',
    message: 'Что-то пошло не так, проверьте соединение с интерентом',
    status: 503,
    data: {},
  },
};


export type ApiOptions = {
  withFile?: boolean, // флаг необходим для того, чтобы формировать FormData или обычный JSON объект
  downloadInstantly?: boolean, // скачиваем файл из заголовка content-type: disposition
  shouldStayUnauthorized?: boolean, // например, если отправляем запрос, но хотим, чтобы на 401 нас не выкидывало со страницы
}
interface ApiI extends ApiOptions {
  method: Method,
  url: string,
  variables?: object, // непосредственно тело запроса
  ctx?: NextPageContext // если запрос отправляется с сервера ноды
}

const request = <T extends ApiI>(params: T) => new Promise<any>((resolve, reject) => {
  const {
    method,
    url,
    variables,
    withFile,
    downloadInstantly,
    shouldStayUnauthorized,
    ctx,
  } = params;

  // Возможно, в дальнейшем нужно будет переписать с использованием
  // proxy контейнера, который будет определять, какой тип данных
  // находится в объекте и возвращаться соотетвствующий объект (object или FormData)
  const data = withFile ? new FormData() : variables;

  if (process.browser && data instanceof FormData) {
    Object.entries(variables).forEach(([key, value]) => {
      data.append(key, value);
    });
  }

  axios({
    url: `${defaults.baseURL}${url}`,
    method,
    headers: defaults.headers(ctx),
    params: method === 'get' ? variables : undefined,
    data: method !== 'get' ? data : undefined,
    paramsSerializer: objectToQueryString
  }).then(
    (response: AxiosResponse) => {
      if (response.headers['content-disposition'] && downloadInstantly) {
        downloadFileFromHeaders(response);
      } else {
        resolve(response.data);
      }
    },
  )
    .catch(
      (error: AxiosError) => {
        if (error.response) {
          if (error.response.data.code === 401) {
            if (error.response.data.message === 'Expired JWT Token') {
              removeAuth(ctx);
            }

            if (!shouldStayUnauthorized) {
              redirect('/?login=true', ctx);
            }
          } else {
            reject(error.response.data);
          }
        } else {
          reject(defaults.error);
        }
      },
    );
});

const api = {
  get: (args: Omit<ApiI, 'method'>) => request({ method: 'get', ...args }),
  post: (args: Omit<ApiI, 'method'>) => request({ method: 'post', ...args }),
  put: (args: Omit<ApiI, 'method'>) => request({ method: 'put', ...args }),
  patch: (args: Omit<ApiI, 'method'>) => request({ method: 'patch', ...args }),
  delete: (args: Omit<ApiI, 'method'>) => request({ method: 'delete', ...args }),
};


export default api;