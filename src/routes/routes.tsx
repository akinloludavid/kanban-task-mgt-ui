import { lazy } from "react";
import WithSuspense from "../components/WithSuspense";
import { IAppRoute } from "../types";
import {
  BOOKMARKED,
  HOME,
  LOGIN_PAGE,
  MOVIES,
  SERIES,
  SIGNUP_PAGE,
} from "./pathnames";

const HomePage = WithSuspense(lazy(() => import("../pages/Home")));

export const AppRoutes: IAppRoute[] = [{ path: HOME, element: <HomePage /> }];
