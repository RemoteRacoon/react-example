import { FC, useEffect, useState } from "react";
import RegisterContext from './RegisterContext';
import RegisterForm from './RegisterForm';
import RegisterBanner from './RoleBanner';
import { Organization } from "models/Organization";
import RegisterConditions from "./Conditions";
import styles from './Styles.module.scss';
import Modal from "@/UI/Modal";
import useQueryParamModal from "shared/hooks/queryParamModal";
import ConfirmPhoneModal from "./ConfirmPhone";
import { UserI } from "models/User";

const Register: FC = () => {
  const organization = new Organization();
  const [isSeller, setIsSeller] = useState(organization.$isSeller);
  const [user, setUser] = useState<UserI>(null);
  const { open, close, isOpen } = useQueryParamModal('confirm-phone');

  return (
    <div className={styles.container}>
      <RegisterContext.Provider value={{ isSeller, setIsSeller, user, setUser, onRegister: open }}>
        <RegisterForm />
        <RegisterBanner />
        {
          // проверяем на пользователя от "слишком умных", которые могут вбить запрос напрямую в адрес
          isOpen() && user &&
          <Modal
            onClose={close}
            isOpen
            withCloseIcon
          >
            <ConfirmPhoneModal onConfirm={close} />
          </Modal>
        }
      </RegisterContext.Provider>
      <RegisterConditions />
    </div>
  )
}

Register.displayName = 'RegisterFormWithBanner';

export default Register;