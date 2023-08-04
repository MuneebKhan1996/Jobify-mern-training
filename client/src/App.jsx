import React from 'react';
import {
  DashboardLayout,
  Error,
  HomeLayout,
  Login,
  Register,
  Landing,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
} from './pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('dark-item') === 'true';
  localStorage.setItem('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        children: [
          {
            index: true,
            element: <AddJob />,
          },
          { path: 'stats', element: <Stats /> },
          {
            path: 'all-jobs',
            element: <AllJobs />,
          },

          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
