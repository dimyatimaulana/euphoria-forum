import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthPage() {
  return (
    <div>
      <h1>
        dashboard
      </h1>
      <Outlet />
    </div>
  );
}

export default AuthPage;
