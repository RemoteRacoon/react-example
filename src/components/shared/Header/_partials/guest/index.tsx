import Button from '@/UI/Button';
import Modal from '@/UI/Modal';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useQueryParamModal from 'shared/hooks/queryParamModal';
import styles from './Styles.module.scss';

const Header_partial_guest: FC = () => {
  const router = useRouter();
  const { open, isOpen, close } = useQueryParamModal('login');

  return (
    <div className={styles.guest}>
      {router.pathname !== '/register' &&
        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.push('/register')}
        >
          Зарегистрироваться
        </Button>}
      <Button onClick={() => open()}>
        Вход
      </Button>
      {
        isOpen() &&
        <Modal
          withCloseIcon
          onClose={close}
          isOpen
        >
          <div>Login modal</div>
        </Modal>
      }
    </div>
  )
};

export default Header_partial_guest;
