import { FC, useEffect, useState } from "react";
import BrandIcon from '@/icons/Brand/logo_gradient.svg';
import styles from './Styles.module.scss';
import Image from 'next/image';
import Link from "next/link";
import Guest from "./_partials/guest";
import PartialUser from './_partials/user';
import { getToken } from "shared/utils/auth";

const Header: FC = () => {
  const hasToken = !!getToken();
  const childComponent = hasToken ? () => <PartialUser /> : () => <Guest />
  const [headerStyles, setHeaderStyles] = useState(styles.header);

  useEffect(() => {
    if (hasToken) {
      setHeaderStyles(styles['header-user']);
    }
  }, [hasToken]);

  return (
    <div className={headerStyles}>
      <div className={styles.logo}>
        <Link href='/' passHref>
          <a className={styles.logo}>
            <Image
              src={BrandIcon}
              alt="Brand"
            />
          </a>
        </Link>
      </div>
      {process.browser && childComponent()}
    </div>
  )
}

export default Header;