import { lazy } from "react";
import { Navigate } from 'react-router-dom'
import WithSuspense from '../components/WithSuspense'
import { IAppRoute } from '../types'
import { DASHBOARD, HOME, LOGIN_PAGE, SIGNUP_PAGE } from './pathnames'

const HomePage = WithSuspense(lazy(() => import('../pages/Home')))
const SignUpPage = WithSuspense(lazy(() => import('../pages/Signup')))
const LoginPage = WithSuspense(lazy(() => import('../pages/Login')))

export const PublicRoutes: IAppRoute[] = [
    { path: HOME, element: <HomePage /> },
    { path: SIGNUP_PAGE, element: <SignUpPage /> },
    { path: LOGIN_PAGE, element: <LoginPage /> },

    { path: '*', element: <Navigate to='/login' /> },
]

export const PrivateRoutes: IAppRoute[] = [
    { path: DASHBOARD, element: <HomePage /> },
    { path: SIGNUP_PAGE, element: <SignUpPage /> },
    { path: LOGIN_PAGE, element: <LoginPage /> },
]