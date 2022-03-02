import { FC } from 'react';
import Image from 'next/dist/client/image';
import classes from './Styles.module.scss';
import InstIcon from '@/icons/Media/instagram.svg';
import YoutubeIcon from '@/icons/Media/youtube.svg';
import TelegIcon from '@/icons/Media/telegram.svg';
import LogoGradient from '@/icons/Brand/logo_gradient.svg';
import Input from '@/UI/Input';
import Button from '@/UI/Button';

const Footer: FC = () => (
  <footer className={classes.footer}>
    <div className={classes.footer__contactWrapper}>
      <div className={classes.footer__about}>
        <div className={classes.footer__header}>
          <div><Image src={LogoGradient} alt="" /></div>
          <div className={classes.footer__navlinks}>
            <span className={classes.footer__navlink}>О компании</span>
            <span className={classes.footer__navlink}>Документы</span>
            <span className={classes.footer__navlink}>Поддержка</span>
          </div>
        </div>
        <div className={classes.footer__subscription}>
          <span className={classes.footer__subsribeTitle}>
            Хотите получать первыми наши новости на почту?
          </span>
          <div className={classes.footer__subscribe}>
            <Input placeholder='ваш email' type={'email'} onChange={() => { }} />
            <Button>Подписаться</Button>
          </div>
        </div>
      </div>
      <div className={classes.footer__contact}>
        <div className={classes.footer__call}>
          <span className={classes.footer__phoneNumber}>
            +7 999 000 11 11
          </span>
          <span>для звонков по России</span>
        </div>
        <div className={classes.footer__address}>
          <span className={classes.footer__addressEmail}>
            info@allper.ru
          </span>
          <div className={classes.footer__location}>
            <span>Новосибирск</span>
            <span>ул. Название 10, офис 100</span>
          </div>
        </div>
      </div>
    </div>
    <div className={classes.footer__cookie}>
      АО «AllPer» использует файлы «cookie», с целью персонализации сервисов и
      повышения удобства пользования веб-сайтом. «Cookie» представляют собой небольшие файлы,
      содержащие информацию о предыдущих посещениях веб-сайта.
      Если вы не хотите использовать файлы «cookie», измените настройки браузера.
    </div>
    <div className={classes.footer__media}>
      <span>©  2021 AllPer</span>
      <div className={classes.footer__icons}>
        <Image src={TelegIcon} width={24} height={24} alt="" />
        <Image src={InstIcon} width={24} height={24} alt="" />
        <Image src={YoutubeIcon} width={24} height={24} alt="" />
      </div>
    </div>
  </footer>
);

export default Footer;
