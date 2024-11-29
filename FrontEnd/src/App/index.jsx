import { RouterProvider } from 'react-router-dom';
import router from '../Students/routes';
import React from 'react';
import './style.css';

export default function App() {
  return <RouterProvider router={router} />;
}