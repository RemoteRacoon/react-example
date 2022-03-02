import { FC } from 'react';
import Form from '@/UI/Form';
import styles from './Styles.module.scss';
import ContactInfoForm, { CONTACT_INFO_SCHEMA } from './contactInfo';
import * as yup from 'yup';

const ProfileData: FC = () => {

  return (
    <div>
      <Form
        initialValues={{
          organization: {
            name: 'ООО Роснефть'
          },
          email: '',
          phone: '+79642221515',
          fio: '',
        }}
        validationSchema={yup.object().shape({
          ...CONTACT_INFO_SCHEMA
        })}
        validateOnMount={true}
        onSubmit={() => { }}
        validateOnBlur={true}
      >
        <Form.Element className={styles.form}>
          <div className={styles.form__block}>
            <ContactInfoForm />
          </div>
        </Form.Element>
      </Form>
    </div>
  )
}

ProfileData.displayName = 'ProfileData';

export default ProfileData;