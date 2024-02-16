import { useRoutes } from "react-router-dom";
import { PublicPageLayout, PrivatePageLayout } from '../layout/PageLayout'
import { userInfo } from '../utils/helpers'
import { PublicRoutes } from './routes'

export const PublicAppRouteWrapper = () => {
    const routes = useRoutes(PublicRoutes)
    return routes
}

export const Pages = () => {
    return (
        <>
            {userInfo ? (
                <PrivatePageLayout>''</PrivatePageLayout>
            ) : (
                <PublicPageLayout>
                    <PublicAppRouteWrapper />
                </PublicPageLayout>
            )}
        </>
    )
}
