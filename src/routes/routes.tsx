import { lazy } from "react";
import { Navigate } from 'react-router-dom'
import WithSuspense from '../components/WithSuspense'
import { IAppRoute } from '../types'
import { BOARD_PAGE, DASHBOARD, LOGIN_PAGE, SIGNUP_PAGE } from './pathnames'

const SignUpPage = WithSuspense(lazy(() => import('../pages/Signup')))
const LoginPage = WithSuspense(lazy(() => import('../pages/Login')))
const DashboardPage = WithSuspense(lazy(() => import('../pages/Dashboard')))
const BoardPage = WithSuspense(lazy(() => import('../pages/Board')))

export const PublicRoutes: IAppRoute[] = [
    { path: SIGNUP_PAGE, element: <SignUpPage /> },
    { path: LOGIN_PAGE, element: <LoginPage /> },
    { path: '*', element: <Navigate to={LOGIN_PAGE} /> },
]

export const PrivateRoutes: IAppRoute[] = [
    { path: DASHBOARD, element: <DashboardPage /> },
    { path: BOARD_PAGE, element: <BoardPage /> },
    { path: '*', element: <Navigate to={DASHBOARD} /> },
]