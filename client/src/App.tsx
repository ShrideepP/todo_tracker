import { QueryClientProvider, QueryClient } from 'react-query';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { HomePage } from './web/views';

const queryClient = new QueryClient();

const App = () => {
    const location = useLocation();
    return (
        <QueryClientProvider client={queryClient}>
            <AnimatePresence>
                <Routes location={location} key={location.key}>
                    <Route index element={<HomePage />} />
                </Routes>
            </AnimatePresence>
            <Toaster position='top-center' />
        </QueryClientProvider>
    );
};

export default App;
