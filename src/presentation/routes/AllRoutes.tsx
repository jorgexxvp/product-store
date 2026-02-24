import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom';

import { Layout as LayoutGeneral } from '@/presentation/common/layout';
import { ROUTE_PORTAL } from '@/presentation/toolbox/constants/route';
import { NotFound } from '@/presentation/common/components/NotFound';

export const allRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={ROUTE_PORTAL}
        element={
          <LayoutGeneral>
            <Outlet />
          </LayoutGeneral>
        }
      ></Route>
      <Route path="*" element={<NotFound />} />
    </>,
  ),
);
