import React, { FC } from 'react';
import styles from './Styles.module.scss';
import Image from 'next/image';
import BuyerBrand from '@/icons/Buyer/Buyer.svg';
import WarningIcon from '@/UI/Icons/Warning';
import BellIcon from '@/UI/Icons/Bell';
import { formatFio } from 'shared/utils/misc';
import { pick } from 'lodash';
import getUser from 'services/UserService/swr/getUser';
import toast from 'shared/utils/toast';

const Header_partial_user: FC = () => {
  const { user, isUserLoading, error } = getUser(null, { revalidateOnFocus: false });

  if (isUserLoading) {
    return <div>Данные подгружаются...</div>
  }

  if (error) {
    toast.error(error.message);
  }

  return (
    <div className={styles.user}>
      <div className={styles.lots}>
        {user.organization.isSeller ? 'Лоты и сделки' : 'Сделки'}
      </div>

      <div className={styles.deposit}>
        <div className={styles.deposit__info}>
          <span>Депозит</span>
          <span className={styles.deposit__warning}>
            <WarningIcon size={'24px'} />
          </span>
        </div>
        <div className={styles.deposit__bank}>
          <span className={styles.deposit__account}>
            Свободно:
          </span>
          <span className={styles.deposit__figures}>
            {user.organization.balance}
          </span>
        </div>
        <div className={styles.deposit__bank}>
          <span className={styles.deposit__account}>
            Заблокировано:
          </span>
          <span className={styles.deposit__figures}>
            {user.organization.blockedSum}
          </span>
        </div>
      </div>

      <div className={styles.notification}>
        <BellIcon active size={'24px'} />
      </div>

      <div className={styles.organization}>
        <div className={styles.organization__contact}>
          <span>
            {user.organization.name}
          </span>
          <span className={styles.organization__owner}>
            {formatFio(pick(user, ['firstName', 'lastName', 'patronymicName']))}
          </span>
        </div>
        <div className={styles.organization__brand}>
          <Image src={BuyerBrand} alt='Buyer' />
        </div>
      </div>
    </div>
  );
};

Header_partial_user.displayName = 'Header_partial_user';

export default Header_partial_user;
