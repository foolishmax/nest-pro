import { HomeOutlined } from '@ant-design/icons';
import React from 'react';
import { Result404 } from '../components';
import Home from '../view/home';

interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

const ROUTE_KEY = {
  HOME: 'home',
  RESULT_404: '404',
};

export const ROUTE_COMPONENTS: Record<string, () => JSX.Element> = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.RESULT_404]: Result404,
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: 'home',
    name: '首页',
    icon: <HomeOutlined />,
  },
  [ROUTE_KEY.RESULT_404]: {
    path: '*',
    name: '404',
    hideInMenu: true,
  },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({
  ...ROUTE_CONFIG[key],
  key,
}));
