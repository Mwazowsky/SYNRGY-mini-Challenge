import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { BooksList, BooksCreate } from './pages/books';
import Login from './pages/Login';

const theme = createTheme({
  status: {
    danger: orange[500],
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <BooksList />,
  },

  {
    path: '/create',
    element: <BooksCreate />,
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
