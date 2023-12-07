import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { BooksList, BooksCreate, BooksUpdate } from "./pages/books";
import Login from "./pages/Login";

const theme = createTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <BooksList />,
  },

  {
    path: "/create",
    element: <BooksCreate />,
  },

  {
    path: "/update/:car_id",
    element: <BooksUpdate />,
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </LocalizationProvider>
  );
}
