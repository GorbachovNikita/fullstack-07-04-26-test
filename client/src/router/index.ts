import React from 'react';
import Items from '../pages/Items/Items';
import Login from '../pages/Login/Login';

export interface IRoute {
   path: string;
   element: React.ElementType;
}

export enum RouteNames {
   LOGIN = '/login',
   ITEMS = '/items',
}

export const publicRoutes: IRoute[] = [
   { path: RouteNames.LOGIN, element: Login },
   { path: '/*', element: Login },
];

export const privateRoutes: IRoute[] = [
   { path: RouteNames.ITEMS, element: Items },
   { path: '/*', element: Items },
];
