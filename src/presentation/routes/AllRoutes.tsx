import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom';

import { Layout as LayoutGeneral } from '@/presentation/common/layout';
import { ROUTE_PORTAL } from '@/presentation/toolbox/constants/route';
import { NotFound } from '@/presentation/common/components/NotFound';
import { Portal } from '@/presentation/common/views/Portal/feature/Portal';

export const allRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <LayoutGeneral>
          <Outlet />
        </LayoutGeneral>
      }
    >
      <Route path={ROUTE_PORTAL} index element={<Portal />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);
