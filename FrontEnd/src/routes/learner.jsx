import Home from '../Learners/pages/home';
import News from '../Learners/pages/news';
import Scholars from '../Learners/pages/scholars';
import Lectures from '../Learners/pages/lectures';
import Article from '../Learners/pages/article';
import Enter from '../Learners/pages/signup';
import SignOut from '../Learners/pages/signout';

const learner = [
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
    {
        path: 'sign_up',
        element: <Enter />,
    },
    {
        path: 'sign_out',
        element: <SignOut />,
    },
];

export default learner;