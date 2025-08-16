import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import Layout from '@/components/layout'

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <Layout>
            <Link to="/"></Link>
            <Link to="/notes"></Link>
            <Outlet />
        </Layout>
    )
}
