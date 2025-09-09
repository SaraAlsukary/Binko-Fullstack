import SuspendPage from '@components/feedback/SuspendPage/SuspendPage';
import { useAppSelector } from '@hooks/app';
import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const HomePage = lazy(() => import('src/HomePage'));
const Categories = lazy(() => import('@pages/Categories/Categories'));
// const ChatsHomepage = lazy(() => import('@pages/Chats/ChatsHomepage'));
const UserInfo = lazy(() => import('@pages/UserInfo/UserInfo'));
const About = lazy(() => import('@pages/About/About'));
const Login = lazy(() => import('@pages/Login/Login'));
const Waiting = lazy(() => import('@pages/Waiting/Waiting'));
const News = lazy(() => import('@pages/News/News'));
const Registeration = lazy(() => import('@pages/Registeration/Registeration'));
const Books = lazy(() => import('@pages/Books/Books'));
const TopBooks = lazy(() => import('@components/Books/TopBooks/Books'));
const Notifications = lazy(() => import('@pages/Notifications/Notifications'));
const BooksCategory = lazy(() => import('@pages/BooksCategory/Books'));
const BooksInfo = lazy(() => import('@pages/BooksInfo/BooksInfo'));
const BooksInfoMore = lazy(() => import('@pages/BooksInfoMore/BooksInfo'));
const EditBook = lazy(() => import('@pages/EditBook/EditBook'));
const DenyNote = lazy(() => import('@pages/DenyNote/DenyNote'));
const Comments = lazy(() => import('@pages/Comments/Comments'));
const DenyNoteChapter = lazy(() => import('@pages/DenyNoteChapter/DenyNote'));
const AddBook = lazy(() => import('@pages/AddBook/AddBook'));
const AddProfile = lazy(() => import('@pages/AddProfile/AddProfile'));
const AddChapter = lazy(() => import('@pages/AddChapter/AddChapter'));
const Favorite = lazy(() => import('@pages/Favorite/Favorite'));
const Profile = lazy(() => import('@pages/Profile/Profile'));
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
            path: "/Binko/addProfile",
            element: <SuspendPage><AddProfile /></SuspendPage>
        }, {
            path: "/Binko/notifications",
            element: <SuspendPage><Notifications /></SuspendPage>
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
            element: <SuspendPage><Profile /></SuspendPage>
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
            path: `books/:idBook/more/:id`,
            element: <SuspendPage><BooksInfoMore /></SuspendPage>,

        },
        {
            path: 'books/:id/comments/:idComment/replies',
            element: <SuspendPage><Comments /></SuspendPage>,

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
        path: '/Binko/waiting',
        element: <SuspendPage> <Waiting /></SuspendPage>
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

    ])
    return <RouterProvider router={router} />
}

export default AppRouter;
