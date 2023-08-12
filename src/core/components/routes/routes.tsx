import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MenuItems } from '../../types/menu';

const About = lazy(() => import('../../../features/pages/about/about'));
const Work = lazy(() => import('../../../features/pages/work/work'));
const Animation = lazy(() => import('../../../features/pages/animation/animation'));
const Contact = lazy(() => import('../../../features/pages/contact/contact'));
const Detail = lazy(() => import('../../../features/pages/details/details'));
const Login = lazy(() => import('../../../features/pages/login/login'));
export function AppLazyRoutes({ items }: { items: MenuItems }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path={''} element={<Work></Work>}></Route>
                <Route path={items[0].path} element={<Work></Work>}></Route>
                <Route path={items[1].path} element={<Animation></Animation>}></Route>
                <Route path={items[2].path} element={<About></About>}></Route>
                <Route
                    path={items[3].path}
                    element={<Contact></Contact>}
                ></Route>
                <Route path={'details'} element={<Detail></Detail>}></Route>
                <Route path={'login'} element={<Login></Login>}></Route>
                <Route
                    path={'*'}
                    element={<Navigate to="" replace></Navigate>}
                ></Route>
            </Routes>
        </Suspense>
    );
}
