import { RouterProvider } from 'react-router-dom'

import { allRoutes } from './routes/AllRoutes'

function App() {
    return <RouterProvider router={allRoutes} />
}

export default App
