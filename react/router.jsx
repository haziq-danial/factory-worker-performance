import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./src/views/Dashboard.jsx";
import DefaultLayout from "./src/components/DefaultLayout.jsx";
import Employee from "./src/views/Employee.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/employees',
                element: <Employee/>
            }
        ]
    }
])

export default router
