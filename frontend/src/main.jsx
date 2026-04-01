import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Admin/Login.jsx';
import AdminLayout from './components/Admin/AdminLayout.jsx';
import PrivateRoute from './components/Admin/PrivateRoute.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import AnnouncementsManager from './pages/Admin/AnnouncementsManager.jsx';
import About from './pages/About.jsx';
import Academics from './pages/Academics.jsx';
import Admissions from './pages/Admissions.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';
import CarouselManager from './pages/Admin/CarouselManager.jsx';
import AchievementsManager from './pages/Admin/AchievementsManager.jsx';
import './index.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<App />}>
        <Route index={true} element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="academics" element={<Academics />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin/login" element={<Login />} />
      </Route>

      <Route path="admin" element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="announcements" element={<AnnouncementsManager />} />
          <Route path="carousel" element={<CarouselManager />} />
          <Route path="achievements" element={<AchievementsManager />} />
        </Route>
      </Route>
    </Route>
  ),
  {
    basename: import.meta.env.BASE_URL
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
