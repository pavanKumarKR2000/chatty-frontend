import Navbar from './components/Navbar.tsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import SignUpPage from './pages/SignUpPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import { useAuthStore } from './store/useAuthStore.ts';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore.ts';

const App = () => {
    const { checkAuth, authUser, isCheckingAuth, onlineUsers } = useAuthStore();
    const { theme } = useThemeStore();
    console.log({ onlineUsers });

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth && !authUser) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader className="animate-spin size-10" />
            </div>
        );
    }

    return (
        <div data-theme={theme}>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        authUser ? <HomePage /> : <Navigate to="/auth/login" />
                    }
                />
                <Route
                    path="/auth/signup"
                    element={authUser ? <Navigate to="/" /> : <SignUpPage />}
                />
                <Route
                    path="/auth/login"
                    element={authUser ? <Navigate to="/" /> : <LoginPage />}
                />
                <Route
                    path="/settings"
                    element={
                        authUser ? (
                            <SettingsPage />
                        ) : (
                            <Navigate to="/auth/login" />
                        )
                    }
                />
                <Route
                    path="/profile"
                    element={
                        authUser ? (
                            <ProfilePage />
                        ) : (
                            <Navigate to="/auth/login" />
                        )
                    }
                />
            </Routes>
            <Toaster />
        </div>
    );
};
export default App;
