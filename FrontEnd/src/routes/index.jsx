import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Guest/pages/layout';
import Home from '../Guest/pages/home';
import News from '../Guest/pages/news';
import Scholars from '../Guest/pages/scholars';
import Lectures from '../Guest/pages/lectures';
import Article from '../Guest/pages/article';
import Enter from '../Guest/pages/signup';
import SignOut from '../Guest/pages/signout';

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
    path: 'sign_out',
    element: <SignOut />,
  },
]);

export default router;