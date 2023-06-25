import { AnimatePresence } from 'framer-motion';
import { useCookies } from 'react-cookie';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { NavigationMenu, Home, Profile, UpdateProfile, SignUp, SignIn } from './components';
import { Toaster } from 'react-hot-toast';

const App = () => {
    const [cookies, _] = useCookies(['access_token']);
    const location = useLocation();
    return (
        <AnimatePresence>
            <NavigationMenu key="navigation-menu" />
            <Routes location={location} key={location.pathname}>
                <Route index element={cookies.access_token ? <Home /> : <Navigate to="/sign-in" />} />
                <Route path='/profile' element={cookies.access_token ? <Profile /> : <Navigate to="/sign-in" />} />
                <Route path='/profile/edit' element={cookies.access_token ? <UpdateProfile /> : <Navigate to="/sign-in" />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/sign-in' element={<SignIn />} />
            </Routes>
            <Toaster position='top-center' />
        </AnimatePresence>
    );
};

export default App;
