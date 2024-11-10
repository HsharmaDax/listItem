import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import ItemDashboard from './controller/ItemDashboard';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './controller/Login';
import Registration from './controller/Registration';

function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Registration />
    },
    {
      path: '/',
      element: <ItemDashboard/>
    }
  ])
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;