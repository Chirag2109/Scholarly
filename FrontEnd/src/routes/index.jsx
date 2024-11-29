import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/layout';
import Home from '../pages/home';
import News from '../pages/news';
import Scholars from '../pages/scholars';
import Lectures from '../pages/lectures';
import Article from '../pages/article';
import Enter from '../pages/signup';
import SignIn from '../pages/signin';

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
    ],
  },
  {
    path: 'sign_up',
    element: <Enter />,
  },
  {
    path: 'sign_in',
    element: <SignIn />,
  },
]);

export default router;