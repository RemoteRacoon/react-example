import { FC, useState, useEffect } from 'react';
import styles from './Styles.module.scss';
import { uniqueId } from 'lodash';
import pubsub from 'sweet-pubsub';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { IoMdClose } from 'react-icons/io';

const Toast: FC = () => {
  const [toasts, setToasts] = useState([]);

  const setToastType = (type) => {
    switch (type) {
      case 'success':
        return styles['toast-success']
      case 'danger':
        return styles['toast-danger']
      default:
        return ''
    }
  }

  useEffect(() => {
    const addToast = ({ type = 'success', message, title, duration = 5 }) => {
      const id = uniqueId('toast-');

      setToasts(current => [...current, { id, type, message, title }]);

      if (duration) {
        setTimeout(() => removeToast(id), duration * 1000);
      }
    };

    pubsub.on('toast', addToast);

    return () => {
      pubsub.off('toast', addToast);
    }

  }, []);

  const removeToast = (id: string) => {
    setToasts(current => current.filter(toast => toast.id !== id));
  }

  return (
    <div className={styles.container}>
      <TransitionGroup className={styles['transition-group']}>
        {toasts.map((toast, id) => (
          <CSSTransition key={toast.id} timeout={200 * (id + 1)} classNames={{
            enter: styles['toast-enter'],
            enterActive: styles['toast-enter-active'],
            exit: styles['toast-exit'],
            exitActive: styles['toast-exit-active']
          }}>
            <div
              className={[styles.toast, setToastType(toast.type)].join(' ')}
            >
              <div
                role={"button"}
                onClick={() => removeToast(toast.id)}
                className={styles.close}
              >
                <IoMdClose />
              </div>
              {toast.tile ?
                <div className={styles.title}>
                  {`${toast.title}:`}
                </div>
                :
                null
              }
              <div className={styles.message}>{toast.message}</div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}

export default Toast;