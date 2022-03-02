import { FC, useRef, useState } from 'react';
import Image from 'next/image';
import Attachement from '@/icons/Attachement/attachement.svg';
import Minus from '@/icons/Toggle/minus.svg';
import Plus from '@/icons/Toggle/plus.svg';
import classes from './Styles.module.scss';
import Link from 'next/link';
import Splitter from 'components/shared/Splitter';

const RegisterConditions: FC = () => {
  const $firstToggled = useRef<boolean>(false);
  const $secondToggled = useRef<boolean>(false);

  const [firtCondCls, setFirstCondCls] = useState([classes.conditions__list]);
  const [secondCondCls, setSecondCondCls] = useState([classes.conditions__list]);

  const toggleFirst = () => {
    if ($firstToggled.current) {
      setFirstCondCls([classes.conditions__list]);
    } else {
      setFirstCondCls((prev) => ([...prev, classes['conditions__list-toggled']]));
    }
    $firstToggled.current = !$firstToggled.current;
  };

  const toggleSecond = () => {
    if ($secondToggled.current) {
      setSecondCondCls([classes.conditions__list]);
    } else {
      setSecondCondCls((prev) => ([...prev, classes['conditions__list-toggled']]));
    }
    $secondToggled.current = !$secondToggled.current;
  };

  return (
    <div className={classes.conditions}>
      <div>
        <div className={classes.conditions__header}>
          <div className={classes.conditions__title}>
            <div className={classes.conditions__index}>1</div>
            {' '}
            <span>Какие будут условия работы с платформой</span>
          </div>
          <Image
            src={$firstToggled.current ? Plus : Minus}
            onClick={toggleFirst}
            className={classes.conditions__toggle}
            alt={$firstToggled.current ? 'Показать' : 'Скрыть'}
          />
        </div>
        <Splitter customClasses={classes.conditions__splitter} />
        <div className={firtCondCls.join(' ')}>
          <p>
            Предлагаем ознакомиться с типовыми формой договора,
            приложений и дополнительных соглашений к нему.
            {' '}
          </p>
          <div className={classes.conditions__itemsWrapper}>
            <Link href={'/'}>
              <a target="_blank" className={classes.conditions__item} rel="noreferrer">
                <Image src={Attachement} alt='файл' />
                Типовой договор с платформой
              </a>
            </Link>

            <Link href="/" >
              <a target="_blank" className={classes.conditions__item} rel="noreferrer">
                <Image src={Attachement} alt='файл' />
                Дополнительное соглашение
              </a>
            </Link>

            <Link href="/" >
              <a target="_blank" className={classes.conditions__item} rel="noreferrer">
                <Image src={Attachement} alt='файл' />
                Приложение 1. Коммерчесие условия и санкции
              </a>
            </Link>

            <Link href="/" >
              <a target="_blank" className={classes.conditions__item} rel="noreferrer">
                <Image src={Attachement} alt='файл' />
                Депозит
              </a>
            </Link>

          </div>
        </div>
      </div>

      <div>
        <div className={classes.conditions__header}>
          <div className={classes.conditions__title}>
            <div className={classes.conditions__index}>2</div>
            {' '}
            <span>Что мне понадобится для совершения сделок</span>
          </div>
          <Image
            src={$secondToggled.current ? Plus : Minus}
            onClick={toggleSecond}
            className={classes.conditions__toggle}
            alt={$firstToggled.current ? 'Показать' : 'Скрыть'}
          />
        </div>
        <Splitter customClasses={classes.conditions__splitter} />
        <div className={secondCondCls.join(' ')}>
          <p>
            Предлагаем ознакомиться с типовыми формой договора,
            приложений и дополнительных соглашений к нему.
            {' '}
          </p>
          <div className={classes.conditions__itemsWrapper}>
            <Link href="/" >
              <a target="_blank" className={classes.conditions__item} rel="noreferrer">
                <Image src={Attachement} alt='файл' />
                Типовой договор с платформой
              </a>
            </Link>

            <Link href="/" >
              <a target="_blank" className={classes.conditions__item} rel="noreferrer">
                <Image src={Attachement} alt='файл' />
                Дополнительное соглашение
              </a>
            </Link>

            <Link href="/" >
              <a target="_blank" className={classes.conditions__item} rel="noreferrer">
                <Image src={Attachement} alt='файл' />
                Приложение 1. Коммерчесие условия и санкции
              </a>
            </Link>

            <Link href="/" >
              <a target="_blank" className={classes.conditions__item} rel="noreferrer">
                <Image src={Attachement} alt='файл' />
                Депозит
              </a>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterConditions;
