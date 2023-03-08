import { Layout } from '../layout/layout';
import { MenuItems } from '../../types/menu';
import { AppLazyRoutes } from '../routes/routes';
export function App() {
    const items: MenuItems = [
        { path: '/work', label: 'WORK' },
        { path: '/about', label: 'ABOUT' },
        { path: '/contact', label: 'CONTACT' },
    ];
    return (
        <Layout items={items}>
            <AppLazyRoutes items={items}></AppLazyRoutes>
        </Layout>
    );
}
