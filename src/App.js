import React from 'react';
import { createBrowserRouter, RouterProvider , Outlet } from 'react-router-dom';
import Hi from './components/test';
import Settings from './components/settings';
import About from './components/about';
import NavBar from './components/NavBar';
import Bar from './components/Bar';


function App() {
    
  const Layout = () => (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Hi /> },
        { path: "/settings", element: <Settings /> },
        { path: "/about", element: <Bar /> },
      ],
    },
  ]);
    
    return (<RouterProvider router={router} />);
}

export default App;