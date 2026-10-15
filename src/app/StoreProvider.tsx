'use client';

import { AppStore, makeStore } from '@/lib/store';
import { Provider } from 'react-redux';
import { useRef } from 'react';
import Html from './Html';

function StoreProvider({
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

export default StoreProvider;
