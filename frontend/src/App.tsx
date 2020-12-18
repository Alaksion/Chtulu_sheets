import React from 'react';
import { appDefaults as AppDefaults } from './globalStyles';
import AppRoutes from './routes/app.routes';
import AppProvider from './context/index';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
      <AppDefaults />
    </>
  );
};

export default App;
