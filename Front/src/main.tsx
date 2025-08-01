import { ConfirmDialog } from 'primereact/confirmdialog';
import { createRoot } from 'react-dom/client';
import 'node_modules/bootstrap/dist/css/bootstrap.min.css'
import AppRouter from '@routes/AppRouter.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import './index.css';
import { Provider } from 'react-redux';
import "./services/axios-global.js";
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
      <ConfirmDialog />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </PersistGate>
  </Provider>
)
