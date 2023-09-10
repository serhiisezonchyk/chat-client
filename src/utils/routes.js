import Chat from '../pages/chat/Chat';
import LoginPage from '../pages/login/LoginPage';
import RegistrationPage from '../pages/login/RegistrationPage';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTER_ROUTE } from './consts';

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: LoginPage
    },
    {
        path: REGISTER_ROUTE,
        Component: RegistrationPage,
    },
]
export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Chat
    }
]