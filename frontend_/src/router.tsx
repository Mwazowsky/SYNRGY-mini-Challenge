import { ComponentType, Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";

import SidebarLayout from "src/layouts/SidebarLayout";
import BaseLayout from "src/layouts/BaseLayout";

import SuspenseLoader from "src/components/SuspenseLoader";
import PrivateProvider from "./providers/PrivateProvider";
import PublicProvider from "./providers/PublicProvider";

type Props = Record<string, unknown>; // Change this to match the props of your components
type ComponentWithProps = ComponentType<Props>;

// Higher-order component (HOC) with explicit types
const Loader = (Component: ComponentWithProps) => (props: Props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const Transactions = Loader(
  lazy(() => import("src/content/applications/Transactions"))
);
const Products = Loader(
  lazy(() => import("src/content/applications/Products"))
);
const UserProfile = Loader(
  lazy(() => import("src/content/applications/Users/profile"))
);
const UserSettings = Loader(
  lazy(() => import("src/content/applications/Users/settings"))
);

// Components

const Cards = Loader(lazy(() => import("src/content/pages/Components/Details")));

const CreateForms = Loader(lazy(() => import("src/content/pages/Components/Forms/CreateForm")));

const UpdateForms = Loader(lazy(() => import("src/content/pages/Components/Forms/UpdateForm")));

const Login = Loader(
  lazy(() => import("src/content/pages/Components/Login"))
);

// Status

const Status404 = Loader(
  lazy(() => import("src/content/pages/Status/Status404"))
);
const Status500 = Loader(
  lazy(() => import("src/content/pages/Status/Status500"))
);
const StatusComingSoon = Loader(
  lazy(() => import("src/content/pages/Status/ComingSoon"))
);
const StatusMaintenance = Loader(
  lazy(() => import("src/content/pages/Status/Maintenance"))
);

const routes: RouteObject[] = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="management" replace />,
      },
      {
        path: "status",
        children: [
          {
            path: "",
            element: <Navigate to="404" replace />,
          },
          {
            path: "404",
            element: <Status404 />,
          },
          {
            path: "500",
            element: <Status500 />,
          },
          {
            path: "maintenance",
            element: <StatusMaintenance />,
          },
          {
            path: "coming-soon",
            element: <StatusComingSoon />,
          },
        ],
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "management",
    element: (
      <PrivateProvider>
        <SidebarLayout />
      </PrivateProvider>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="transactions" replace />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "profile",
        children: [
          {
            path: "",
            element: <Navigate to="details" replace />,
          },
          {
            path: "details",
            element: <UserProfile />,
          },
          {
            path: "settings",
            element: <UserSettings />,
          },
        ],
      },
    ],
  },
  {
    path: "/form",
    element: (
      <PrivateProvider>
        <SidebarLayout />
      </PrivateProvider>
    ),
    children: [
      {
        path: "create-form",
        element: <CreateForms />,
      },
      {
        path: "update-form/:car_id",
        element: <UpdateForms />,
      },
    ],
  },
  {
    path: "detail",
    element: (
      <PrivateProvider>
        <SidebarLayout />
      </PrivateProvider>
    ),
    children: [
      {
        path: ":car_id",
        element: <Cards />,
      }
    ],
  },
  {
    path: "login",
    element: (
      <PublicProvider>
        <Login />
      </PublicProvider>
    ),
  },
];

export default routes;
