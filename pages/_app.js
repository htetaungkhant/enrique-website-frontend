import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from 'react-toastify';

import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'react-phone-input-2/lib/style.css'

import { store, persistor } from '@/store';
import AuthModal from "@/components/common/auth/AuthModal";

export default function App({
  Component,
  pageProps,
}) {
  // Determine which auth system to use based on the current path
  const isAdminRoute = Component.isAdminRoute ||
    (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'));

  const authOptions = {
    basePath: isAdminRoute ? "/api/auth/admin" : "/api/auth",
    // This helps prevent session conflicts
    refetchInterval: 0,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={pageProps.session} {...authOptions}>
          <ToastContainer />
          <AuthModal />
          <Component {...pageProps} />
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
