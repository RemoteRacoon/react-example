import Image from "next/image";
import { FC, useContext } from "react";
import RegisterCtx from "../RegisterContext";
import BuyerIcon from '@/icons/BuyerSeller/buyer.svg';
import SellerIcon from '@/icons/BuyerSeller/seller.svg';
import styles from './Styles.module.scss';

const RoleBanner: FC = () => {
  const { isSeller } = useContext(RegisterCtx);

  return (
    <div className={styles.role}>
      <div className={styles['role-icon']}>
        {
          isSeller ?
            <Image src={SellerIcon} alt="Seller" />
            :
            <Image src={BuyerIcon} alt="Buyer" />
        }
      </div>
    </div>
  )
}

RoleBanner.displayName = 'RoleBanner';

export default RoleBanner;