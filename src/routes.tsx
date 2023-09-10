import { lazy, Suspense } from "react";
import { RouteObject } from "react-router";
import { Navigate } from "react-router-dom";

const SuspenseLoader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<p>Loading</p>}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const Home = SuspenseLoader(lazy(() => import("./pages/home.page")));
const Pricing = SuspenseLoader(lazy(() => import("./pages/pricing.page")));
const Users = SuspenseLoader(lazy(() => import("./pages/users.page")));
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,

    children: [
      {
        path: "",
        element: <Navigate to="pricing" replace />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
];

export default routes;
