import type { AppProps } from "next/app";
import "@/styles/index.scss";
import Footer from "components/shared/Footer";
import appCls from '@/styles/app.module.scss';
import Toast from "@/UI/Toast";
import Header from "components/shared/Header";

type ComponentWithLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType
  }
}

export default function ({ Component, pageProps }: ComponentWithLayout) {
  return (
    <>
      <Toast />
      <Header />
      <div className={appCls.app}>
        {Component.PageLayout ?
          <Component.PageLayout>
            <Component {...pageProps} />
          </Component.PageLayout>
          :
          <Component {...pageProps} />
        }
      </div>
      {/* <Footer /> */}
    </>
  )
}