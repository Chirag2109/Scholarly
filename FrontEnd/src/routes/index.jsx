import guest from './guest';
import learner from './learner';
import scholar from './scholar';
import Layout from '../layout';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: !JSON.parse(localStorage.getItem('isUserLoggedIn')) ? guest : (() => {
      if (JSON.parse(localStorage.getItem('userType')) === 'learner') {
        return learner;
      } else if (JSON.parse(localStorage.getItem('userType')) === 'scholar') {
        return scholar;
      } else {
        return guest;
      }
    }),
  },
]);

export default router;