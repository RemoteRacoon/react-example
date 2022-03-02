import { FC } from "react";
import classes from './Styles.module.scss';

const ModalTemplate: FC = ({ children }) => (
  <div className={classes.modal__container}>
    {children}
  </div>
)

export const ModalTitle: FC = ({ children }) => (
  <div className={classes.modal__head}>
    <h1 className={classes.modal__title}>{children}</h1>
  </div>
)

export const ModalBody: FC = ({ children }) => (
  <div className={classes.modal__content}>
    <div className={classes.modal__body}>{children}</div>
  </div>

)

export const ModalFooter: FC = ({ children }) => (
  <div className={classes.modal__footer}>{children}</div>
)


export default ModalTemplate;
