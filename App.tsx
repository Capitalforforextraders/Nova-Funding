
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Packages from './components/Packages';
import Rules from './components/Rules';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';
import NotificationToast from './components/NotificationToast';
import PromotionalPopup from './components/PromotionalPopup';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ClientDashboard from './components/ClientDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminLoginPage from './components/AdminLoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import type { FundingPackage, User } from './types';
import * as db from './db';

export type Page = 'home' | 'login' | 'signup' | 'dashboard' | 'admin' | 'admin-login' | 'forgot-password';

const HomePage: React.FC<{ onSelectPackage: (pkg: FundingPackage) => void; }> = ({ onSelectPackage }) => (
    <>
        <Hero onGetFunded={() => document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' })} />
        <Features />
        <Packages onSelectPackage={onSelectPackage} />
        <Rules />
        <Reviews />
    </>
);

const App: React.FC = () => {
    const [selectedPackage, setSelectedPackage] = useState<FundingPackage | null>(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [isLoading, setIsLoading] = useState(true);

    // --- DB Initialization ---
    useEffect(() => {
        const init = async () => {
            await db.initializeDB();
            await checkSession();
            setIsLoading(false);
            // After db is initialized and session is checked, handle the initial hash
            handleHashChange(); 
        };
        init();
    }, []);
    
    // --- Navigation and Routing ---
    const handleNavigate = (page: Page) => {
        window.location.hash = page;
        window.scrollTo(0, 0);
    };

    const handleHashChange = useCallback(() => {
        const hash = window.location.hash.substring(1) as Page || 'home';

        // This check prevents the handler from running unnecessarily if the state is already correct.
        if (hash === currentPage && !isLoading) {
            return;
        }

        // Protected routes
        const isUserProtected = hash === 'dashboard';
        const isAdminProtected = hash === 'admin';

        if ((isUserProtected || isAdminProtected) && !user) {
            window.location.hash = 'login';
            // Update current page immediately for responsive UI
            if (currentPage !== 'login') setCurrentPage('login');
            return;
        }
        if (isAdminProtected && user?.role !== 'admin') {
            window.location.hash = 'dashboard';
            if (currentPage !== 'dashboard') setCurrentPage('dashboard');
            return;
        }
        setCurrentPage(hash);
    }, [user, currentPage, isLoading]);


    useEffect(() => {
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [handleHashChange]);

    // --- User and Auth ---
    const checkSession = async () => {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            const loggedInUser = await db.getUserById(userId);
            if (loggedInUser) {
                setUser(loggedInUser);
                if (loggedInUser.role === 'admin') {
                   await fetchAllUsers();
                }
            } else {
                handleLogout(); // Clean up if user ID is invalid
            }
        }
    };

    const handleLogin = (loggedInUser: User) => {
        sessionStorage.setItem('userId', loggedInUser.id);
        const targetPage = loggedInUser.role === 'admin' ? 'admin' : 'dashboard';
        
        // Set user and page state together to prevent race conditions
        setUser(loggedInUser);
        setCurrentPage(targetPage);

        // Update URL hash to match the new state
        window.location.hash = targetPage;
        window.scrollTo(0, 0);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('userId');
        setUser(null);
        handleNavigate('home');
    };
    
    // --- Admin Data Management ---
    const fetchAllUsers = async () => {
        const users = await db.getAllUsers();
        setAllUsers(users);
    };

    useEffect(() => {
        if (currentPage === 'admin' && user?.role === 'admin') {
            fetchAllUsers();
        }
    }, [currentPage, user]);
    
    const handleUpdateUser = async (userId: string, updates: Partial<User>) => {
        const updatedUser = await db.updateUser(userId, updates);
        if(updatedUser) {
            await fetchAllUsers(); // Refresh admin list
            // If the updated user is the one currently logged in, refresh their data
            if(user?.id === userId) {
                setUser(updatedUser);
            }
            return true;
        }
        return false;
    };

    const handleDeleteUser = async (userId: string) => {
        if(window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            const success = await db.deleteUser(userId);
            if(success) {
                await fetchAllUsers();
                 return true;
            }
        }
        return false;
    };

    // --- Modals and Popups ---
    const handleSelectPackage = (pkg: FundingPackage) => {
        if (!user) {
            handleNavigate('signup');
        } else {
            setSelectedPackage(pkg);
        }
    };

    const handleCloseModal = () => setSelectedPackage(null);

    // --- Promotional Popup Logic ---
    useEffect(() => {
        const checkAndShowPopup = () => {
            if (currentPage === 'home' && !sessionStorage.getItem('promoPopupDismissed')) {
                setIsPopupVisible(true);
            }
        };
        const timer = setTimeout(checkAndShowPopup, 3500);
        return () => clearTimeout(timer);
    }, [currentPage]);
    
    const dismissPopup = () => {
        sessionStorage.setItem('promoPopupDismissed', 'true');
        setIsPopupVisible(false);
    };

    const renderPage = () => {
        if (isLoading) {
            return <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">Initializing Nova Funding...</div>;
        }
        switch (currentPage) {
            case 'login':
                return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
            case 'signup':
                return <SignupPage onNavigate={handleNavigate} onLogin={handleLogin} />;
            case 'admin-login':
                return <AdminLoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
            case 'forgot-password':
                return <ForgotPasswordPage onNavigate={handleNavigate} />;
            case 'dashboard':
                return user && <ClientDashboard user={user} onNavigate={handleNavigate} />;
            case 'admin':
                return user?.role === 'admin' && <AdminDashboard users={allUsers} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser} />;
            case 'home':
            default:
                return <HomePage onSelectPackage={handleSelectPackage} />;
        }
    };

    return (
        <div className="bg-black text-white font-sans">
            <Header user={user} onNavigate={handleNavigate} onLogout={handleLogout} />
            <main>{renderPage()}</main>
            <Footer />
            {currentPage === 'home' && <NotificationToast />}
            <CheckoutModal pkg={selectedPackage} onClose={handleCloseModal} />
            <PromotionalPopup isVisible={isPopupVisible} onDismiss={dismissPopup} />
        </div>
    );
};

export default App;
