import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'react-phone-input-2/lib/style.css'

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from 'react-toastify';

import { store, persistor } from '@/store';
import AuthModal from "@/components/common/auth/AuthModal";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={session}>
          <ToastContainer />
          <AuthModal />
          <Component {...pageProps} />
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
