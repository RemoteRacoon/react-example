import Button from '@/UI/Button';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styles from './Styles.module.scss';

const navItems = [
  {
    key: '/profile',
    value: 'Данные контрагента'
  },
  {
    key: '/profile/employees',
    value: 'Сотрудники'
  },
  {
    key: '/profile/documents',
    value: 'Документы'
  },
  {
    key: '/profile/settings',
    value: 'Настройки'
  }
]

const ProfileHeader: FC = () => {
  const router = useRouter();

  const resolveLinkStyles = (link: any) => {
    if (router.pathname === link.key) {
      return styles['link-active'];
    }
    return styles['link'];
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.header__profile}>Профиль</span>
        <span className={styles.header__isSeller}>Продавец</span>
      </div>
      <div className={styles.navbar}>
        {navItems.map(link => (
          <Button
            key={link.key}
            className={resolveLinkStyles(link)}
            onClick={() => router.push(link.key,)}
          >
            {link.value}
          </Button>
        ))}
      </div>
    </div>
  )
}

ProfileHeader.displayName = 'ProfileHeader';

export default ProfileHeader;
