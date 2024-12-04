import Home from '../Scholars/pages/home';
import News from '../Scholars/pages/news';
import Scholars from '../Scholars/pages/scholars';
import Lectures from '../Scholars/pages/lectures';
import Article from '../Scholars/pages/article';
import Enter from '../Scholars/pages/signup';

const scholar = [
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
];

export default scholar;