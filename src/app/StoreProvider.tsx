'use client';

import { Provider } from 'react-redux';
import { store } from '../lib/store';
import Html from './Html';

function App({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <Provider store={store}>
      <Html>
        {children}
      </Html>
    </Provider>
  );
}

export default App;
