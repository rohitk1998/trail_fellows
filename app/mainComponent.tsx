'use client';

import { Provider } from 'react-redux';
import { store, persister } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function MainComponent({ children }: { children: any }) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        {children}
      </PersistGate>
    </Provider>
  );
}
