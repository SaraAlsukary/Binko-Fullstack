import Messages from '@components/Chats/Messages/Messages';
import SuspendPage from '@components/feedback/SuspendPage/SuspendPage';
import { useAppSelector } from '@hooks/app';
import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const HomePage = lazy(() => import('src/HomePage'));
const Categories = lazy(() => import('@pages/Categories/Categories'));
// const ChatsHomepage = lazy(() => import('@pages/Chats/ChatsHomepage'));
const UserInfo = lazy(() => import('@pages/UserInfo/UserInfo'));
const Chats = lazy(() => import('@pages/Chats/Chats'));
const About = lazy(() => import('@pages/About/About'));
const Login = lazy(() => import('@pages/Login/Login'));
const News = lazy(() => import('@pages/News/News'));
const Registeration = lazy(() => import('@pages/Registeration/Registeration'));
const Books = lazy(() => import('@pages/Books/Books'));
const BooksInfo = lazy(() => import('@pages/BooksInfo/BooksInfo'));
const AddBook = lazy(() => import('@pages/AddBook/AddBook'));
const AddChapter = lazy(() => import('@pages/AddChapter/AddChapter'));
const Favorite = lazy(() => import('@pages/Favorite/Favorite'));
const Profile = lazy(() => import('@pages/Profile/Profile'));
const Settings = lazy(() => import('@pages/Settings/Settings'));
const Chapters = lazy(() => import('@pages/Chapters/Chapters'));
const BooksSearch = lazy(() => import('@pages/BooksSearch/BooksSearch'));
const Home = lazy(() => import('@pages/Home/Home'));


const AppRouter = () => {
    const { theme } = useAppSelector(state => state.theme);
    const { language } = useAppSelector(state => state.language);
    document.body.dataset.theme = theme;
    document.body.dataset.lang = language;
    const router = createBrowserRouter([{
        path: '/Binko',
        element: <SuspendPage ><HomePage /></SuspendPage>,
        children: [{
            index: true, element: <Home />,
        }, {
            path: '/Binko/home',
            element: <SuspendPage> <Home /></SuspendPage>
        },
        {
            path: 'booksSearch',
            element: <SuspendPage><BooksSearch /></SuspendPage>
        },
        {
            path: 'categories',
            element: <SuspendPage><Categories /></SuspendPage>
        }, {
            path: 'news',
            element: <SuspendPage> <News /></SuspendPage>
        },
        {
            path: 'login',
            element: <SuspendPage><Login /></SuspendPage>
        }, {
            path: "registration",
            element: <SuspendPage><Registeration /></SuspendPage>
        }, {
            path: 'about',
            element: <SuspendPage><About /></SuspendPage>
        }, {
            path: 'profile',
            element: <SuspendPage><Profile /></SuspendPage>
        },
        {
            path: 'settings',
            element: <SuspendPage><Settings /></SuspendPage>
        },
        {
            path: 'addBook',
            element: <SuspendPage><AddBook /></SuspendPage>
        },
        {
            path: 'addChapter',
            element: <SuspendPage><AddChapter /></SuspendPage>
        },
        {
            path: 'favorite',
            element: <SuspendPage><Favorite /></SuspendPage>
        }, {
            path: 'books',
            element: <SuspendPage><Books /></SuspendPage>,
        },
        {
            path: 'books/:id',
            element: <SuspendPage><BooksInfo /></SuspendPage>,
        },
        {
            path: 'books/:id/:idChapter',
            element: <SuspendPage><Chapters /></SuspendPage>,
        }
            , {

            path: 'userInfo',
            element: <SuspendPage><UserInfo /></SuspendPage>,
        }

        ],

    }, {
        path: '/Binko/chats',
        element: <SuspendPage><Chats /></SuspendPage>
        , children: [
            // {
            // index: true, element: <ChatsHomepage />,
            // }
            {
                path: ':id',
                element: <SuspendPage><Messages /></SuspendPage>
            }]
    }])
    return <RouterProvider router={router} />
}

export default AppRouter;
