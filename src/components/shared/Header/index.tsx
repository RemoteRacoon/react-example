import { FC, useEffect } from "react";
import BrandIcon from '@/icons/Brand/logo_gradient.svg';
import styles from './Styles.module.scss';
import Image from 'next/image';
import Link from "next/link";
import Guest from "./_partials/guest";
import PartialUser from './_partials/user';
import useUser from "services/UserService/swr/useUser";

const Header: FC = () => {
  const user = 0;

  return (
    <div className={user ? styles['header-user'] : styles.header}>
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


      <Guest />

    </div>
  )
}

export default Header;