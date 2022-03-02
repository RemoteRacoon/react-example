import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import classes from './Styles.module.scss';
import CloseIcon from '@/icons/Toggle/close.svg';
import styles from './Styles.module.scss';
import useOnEscapeKeyDown from 'shared/hooks/onEscapeKeyDown';
import ModalTemplate from '../Templates/Modal';
import { CSSTransition } from 'react-transition-group';

interface ModalI {
  isOpen?: boolean,
  onClose: () => any,
  withCloseIcon?: boolean
}

const Modal: FC<ModalI> = (props) => {
  const { isOpen, withCloseIcon, onClose, children } = props;

  const $clickableOverlayRef = useRef<HTMLDivElement>(null);


  const closeModal = () => {
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  });


  useOnEscapeKeyDown(isOpen, closeModal);

  if (!process.browser) return null;

  return (
    <>
      {isOpen && createPortal(

        <div className={styles['overlay-scrollable']}>
          <div className={styles['overlay-clickable']} ref={$clickableOverlayRef}>
            <div className={classes.modal}>
              {withCloseIcon
                && (
                  <div className={classes.modal__close} onClick={closeModal}>
                    <Image
                      src={CloseIcon}
                      alt='Close'
                    />
                  </div>
                )}
              <ModalTemplate>
                {children}
              </ModalTemplate>
            </div>
          </div>
        </div>,
        document.getElementById('__next'),
      )}
    </>
  );
};

Modal.defaultProps = {
  withCloseIcon: true,
};

export default Modal;
