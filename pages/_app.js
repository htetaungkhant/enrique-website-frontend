import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'react-phone-input-2/lib/style.css';

import { store, persistor } from '@/store';
import AuthModal from "@/components/common/auth/AuthModal";
import { Toaster } from "@/components/ui/sonner"
import ChatBot from '@/components/common/ChatBot';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Advertisement from '@/components/common/Advertisement';

export default function App({
  Component,
  pageProps,
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Determine which auth system to use based on the current path
  const isAdminRoute = Component.isAdminRoute ||
    (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'));

  const isQuestionnaireRoute = Component.isQuestionnaireRoute ||
    (typeof window !== 'undefined' && window.location.pathname.startsWith('/questionnaire'));

  const authOptions = {
    basePath: isAdminRoute ? "/api/auth/admin" : "/api/auth",
    // This helps prevent session conflicts
    refetchInterval: 0,
  };

  useEffect(() => {
    // if (isAdminRoute) {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
    // }
  }, [router]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={pageProps.session} {...authOptions}>
          {isLoading && <LoadingSpinner />}
          <Toaster position="top-right" richColors closeButton />
          <AuthModal />
          <Component {...pageProps} />
          <ChatBot />
          {!isAdminRoute && !isQuestionnaireRoute && <Advertisement />}
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
