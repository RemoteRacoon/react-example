
import { NextPage } from 'next';
import Head from 'next/head';
import Register from 'components/pages/register';

const RegisterPage: NextPage = () => {

  return (
    <>
      <Head>
        <title>Регистрация</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Register />
    </>
  )
}

export default RegisterPage;