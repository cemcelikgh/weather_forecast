'use client';

import { Provider } from 'react-redux';
import Html from './Html';
import { useRef } from 'react';
import { AppStore, makeStore } from '@/lib/store';

function ReduxProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  };

  return (
    <Provider store={storeRef.current}>
      <Html>
        {children}
      </Html>
    </Provider>
  );

}

export default ReduxProvider;
