import Home from '../Guest/pages/home';
import News from '../Guest/pages/news';
import Scholars from '../Guest/pages/scholars';
import Lectures from '../Guest/pages/lectures';
import Article from '../Guest/pages/article';
import Enter from '../Guest/pages/signup';
import SignIn from '../Guest/pages/signin';

const guest = [
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
        path: 'sign_in',
        element: <SignIn />,
    },
];

export default guest;