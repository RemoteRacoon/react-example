/* eslint-disable import/no-anonymous-default-export */
import { get } from 'lodash';
import pubsub from 'sweet-pubsub';

interface ToastI {
  type: 'success' | 'danger' | 'warning',
  title: string,
  message: string
}

const show = (toast: ToastI | Partial<ToastI>) => pubsub.emit('toast', toast);

const success = message => show({ message } as Partial<ToastI>);

const error = err => {
  show({
    type: 'danger',
    title: 'Ошибка',
    message: get(err, 'message', err),
  })
}

export default { show, success, error };