import Form from "@/UI/Form";
import { ModalBody, ModalFooter, ModalTitle } from "@/UI/Templates/Modal";
import { FormikContextType } from 'formik';
import { FC, useContext, useState } from "react";
import styles from './Styles.module.scss';
import * as yup from 'yup';
import RegisterService from "services/RegisterService";
import LoginService from "services/LoginService";
import { useCookies } from "react-cookie";
import toast from "shared/utils/toast";
import redirect from "shared/utils/redirect";
import RegisterCtx from "../RegisterContext";
import Timer from "./Timer";
import SubmitButton from "@/UI/Form/SubmitButton";
import useUser from "services/UserService/swr/useUser";

interface ConfirmModalI {
  onConfirm: Function
}

const ConfirmPhoneModal: FC<ConfirmModalI> = ({ onConfirm }) => {
  const { user, setUser } = useContext(RegisterCtx);
  const { mutateUser } = useUser();
  const [, setCookie] = useCookies(['token']);
  const [code] = useState(user?.confirmCode);

  const loginAndRedirect = async () => {
    const { success, error } = await RegisterService.confirm(user?.phone as string, code.toString());

    if (success) {
      const { token, error } = await LoginService.login(user.username, user.password);

      if (token) {
        setCookie('token', token);
        onConfirm();
        // mutateUser();
        redirect('/profile');
      } else {
        toast.error(error);
      }

    } else {
      toast.error(error);
    }
  }

  const VALIDATION_SCHEMA = yup.object({
    code: yup
      .string()
      .equals([code.toString()], 'Неверный формат')
      .required('Поле обязательно для заполенения')
  });

  const isFormValid = (form: FormikContextType<any>) => VALIDATION_SCHEMA.isValidSync(form.values)

  return (
    <>
      <ModalTitle>Подтвердите номер телефона</ModalTitle>
      <ModalBody>
        <div>
          <p className={styles.info}>Мы отправили код подтверждения на номер {user?.phone}</p>
          <div key={code} className={styles.form}>
            <Form
              initialValues={{ code: '' }}
              validateOnBlur={false}
              validateOnMount={true}
              validationSchema={VALIDATION_SCHEMA}
              onSubmit={() => {
                loginAndRedirect();
              }}
            >
              {(form) => {
                return (
                  <Form.Element>
                    <Form.Field.Input
                      name="code"
                      placeholder="000000"
                      disabled={isFormValid(form)}
                      label="Введите код из СМС"
                      className={styles.input}
                    />
                    <SubmitButton>Отправить</SubmitButton>
                  </Form.Element>
                )
              }}
            </Form>
          </div>
          <Timer />
        </div>
      </ModalBody>
      <ModalFooter>
        <div className={styles['no-sms']}>Не приходит смс?</div>
      </ModalFooter>
    </>
  )
}


export default ConfirmPhoneModal;