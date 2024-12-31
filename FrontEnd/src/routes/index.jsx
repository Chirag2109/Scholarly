import Home from '../pages/home';
import News from '../pages/news';
import Scholars from '../pages/scholars';
import Lectures from '../pages/lectures';
import Article from '../pages/article';
import Enter from '../pages/signup';
import SignIn from '../pages/signin';
import SignOut from '../pages/signout';
import Dashboard from '../pages/dashboard';
import Layout from '../layout';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'news',
        element: <News />,
      },
      {
        path: 'scholars',
        element: <Scholars />,
      },
      {
        path: 'articles',
        element: <Article />,
      },
      {
        path: 'lectures',
        element: <Lectures />,
      },
    ]
  },
  {
    path: 'sign_up',
    element: <Enter />,
  },
  {
    path: 'sign_in',
    element: <SignIn />,
  },
  {
    path: 'sign_out',
    element: <SignOut />,
  },
  {
    path: 'scholar-dashboard',
    element: <Dashboard />,
  }
]);

export default router;