import { FC } from "react";
import { ImSpinner } from 'react-icons/im';
import styles from './Styles.module.scss';

interface SpinnerI {
  className?: string
}

const Spinner: FC<SpinnerI> = ({ className }) => {
  return (
    <ImSpinner className={[styles.spinner, className].join(' ')} />
  )
}

Spinner.displayName = 'LoadingSpinner';

export default Spinner;