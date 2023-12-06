import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

import { BooksList, BooksCreate, BooksUpdate, BooksDetail } from './pages/books';
import Login from './pages/Login';

const theme = createTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <BooksList />,
  },

  {
    path: '/detail/:id',
    element: <BooksDetail />,
  },

  {
    path: '/create',
    element: <BooksCreate />,
  },

  {
    path: '/update/:id',
    element: <BooksUpdate />,
  },

  {
    path: '/login',
    element: <Login />,
  },
]);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
