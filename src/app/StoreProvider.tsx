'use client';

import { AppStore, makeStore } from '@/lib/store';
import { Provider } from 'react-redux';
import { useState } from 'react';
import Html from './Html';

function StoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [store] = useState<AppStore>(makeStore);

  return (
    <Provider store={store}>
      <Html>
        {children}
      </Html>
    </Provider>
  );

}

export default StoreProvider;
