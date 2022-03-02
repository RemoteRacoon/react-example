import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  useCallback
} from "react";
import Spinner from "../Spinner";
import styles from './Styles.module.scss';

export interface ButtonI extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'contained' | 'outlined',
  color?: 'primary' | 'secondary',
  isWorking?: boolean,
  icon?: string,
  className?: string,
}

type Ref = HTMLButtonElement;

const Button = forwardRef<Ref, ButtonI>(({
  children, className, icon, variant, color, isWorking, disabled, ...other
}, ref) => {

  const resolveBtnStyles = useCallback(() =>
    setBtnStyles({ className, variant, color }),
    [className, variant, color]
  );

  return (
    <button
      {...other}
      className={resolveBtnStyles()}
      disabled={disabled || isWorking}
      ref={ref}
    >
      {isWorking && <Spinner />}
      <span>{children}</span>
    </button>
  )
});


function setBtnStyles(props: Pick<ButtonI, 'className' | 'variant' | 'color'>) {
  const {
    className,
    variant,
    color,
  } = props;

  const classes = [];

  classes.push(styles[`button-${color}-${variant}`])
  classes.push(className);

  return classes.join(' ');
}

Button.displayName = 'MyButton';

Button.defaultProps = {
  variant: 'contained',
  color: 'primary',
  isWorking: false,
  icon: null,
  className: null
}

export default Button;