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
const TopBooks = lazy(() => import('@pages/TopBooks/Books'));
const BooksCategory = lazy(() => import('@pages/BooksCategory/Books'));
const BooksInfo = lazy(() => import('@pages/BooksInfo/BooksInfo'));
const EditBook = lazy(() => import('@pages/EditBook/EditBook'));
const DenyNote = lazy(() => import('@pages/DenyNote/DenyNote'));
const DenyNoteChapter = lazy(() => import('@pages/DenyNoteChapter/DenyNote'));
const AddBook = lazy(() => import('@pages/AddBook/AddBook'));
const UpdateBook = lazy(() => import('@pages/UpdateBook/UpdateBook'));
const AddChapter = lazy(() => import('@pages/AddChapter/AddChapter'));
const Favorite = lazy(() => import('@pages/Favorite/Favorite'));
const Profile = lazy(() => import('@pages/Profile/Profile'));
const Settings = lazy(() => import('@pages/Settings/Settings'));
const Chapters = lazy(() => import('@pages/Chapters/Chapters'));
const BooksSearch = lazy(() => import('@pages/BooksSearch/BooksSearch'));
const Home = lazy(() => import('@pages/Home/Home'));
const Supervisor = lazy(() => import('@pages/Supervisor/Supervisor'))
const Admin = lazy(() => import('@pages/Admin/Admin'))

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
        }, {
            path: 'profile/:id',
            element: <SuspendPage><UpdateBook /></SuspendPage>
        },
        {
            path: 'booksSearch',
            element: <SuspendPage><BooksSearch /></SuspendPage>
        }, {
            path: 'booksSearch/:id',
            element: <SuspendPage><BooksInfo /></SuspendPage>
        },
        {
            path: 'categories',
            element: <SuspendPage><Categories /></SuspendPage>,

        }, {
            path: 'categories/books/:id',
            element: <SuspendPage><BooksCategory /></SuspendPage>,

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
            path: 'favorite',
            element: <SuspendPage><Favorite /></SuspendPage>
        }, {
            path: 'books',
            element: <SuspendPage><Books /></SuspendPage>,
        }, {
            path: 'topBooks',
            element: <SuspendPage><TopBooks /></SuspendPage>,
        },
        {
            path: 'books/:id',
            element: <SuspendPage><BooksInfo /></SuspendPage>,

        },
        {
            path: 'books/:id/edit',
            element: <SuspendPage><EditBook /></SuspendPage>,

        },
        {
            path: 'books/:id/note',
            element: <SuspendPage><DenyNote /></SuspendPage>,

        },
        {
            path: 'books/:id/chapter/:idChapter/note',
            element: <SuspendPage><DenyNoteChapter /></SuspendPage>,

        },
        {
            path: 'books/:id/:idChapter',
            element: <SuspendPage><Chapters /></SuspendPage>,
        }
            , {

            path: 'userInfo/:id',
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
    }, {
        path: '/Binko/supervisor',
        element: <SuspendPage><Supervisor /></SuspendPage>
    }, {
        path: '/Binko/admin',
        element: <SuspendPage><Admin /></SuspendPage>
    }, {
        path: '/Binko/books/:id/addChapter',
        element: <SuspendPage><AddChapter /></SuspendPage>
    },
        // {
        //     path: '/Binko/profile/:id',
        //     element: <SuspendPage><UpdateBook /></SuspendPage>
        // },
    ])
    return <RouterProvider router={router} />
}

export default AppRouter;
