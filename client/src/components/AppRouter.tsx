import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router';

const AppRouter = () => {
   const auth = true;
   return (
      <Routes>
         {auth
            ? privateRoutes.map((route) => <Route key={route.path} path={route.path} element={<route.element />} />)
            : publicRoutes.map((route) => <Route key={route.path} path={route.path} element={<route.element />} />)}
      </Routes>
   );
};

export default AppRouter;
