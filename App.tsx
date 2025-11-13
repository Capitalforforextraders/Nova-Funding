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
import type { FundingPackage } from './types';

type User = {
    role: 'user' | 'admin';
};

export type Page = 'home' | 'login' | 'signup' | 'dashboard' | 'admin' | 'admin-login';

const HomePage: React.FC<{
    onSelectPackage: (pkg: FundingPackage) => void;
}> = ({ onSelectPackage }) => {
    const handleScrollToPackages = () => {
        document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Hero onGetFunded={handleScrollToPackages} />
            <Features />
            <Packages onSelectPackage={onSelectPackage} />
            <Rules />
            <Reviews />
        </>
    );
};


const App: React.FC = () => {
    const [selectedPackage, setSelectedPackage] = useState<FundingPackage | null>(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [currentPage, setCurrentPage] = useState<Page>('home');

    // --- Navigation and Routing ---
    const handleNavigate = (page: Page) => {
        window.location.hash = page;
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1) as Page || 'home';
            
            // Protected routes
            const isProtected = hash === 'dashboard' || hash === 'admin';
            if (isProtected && !user) {
                handleNavigate('login');
                return;
            }
            if (hash === 'admin' && user?.role !== 'admin') {
                handleNavigate('dashboard');
                return;
            }

            setCurrentPage(hash);
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Initial load check

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [user]);
    
    // --- User and Auth ---
    const handleLogin = (role: 'user' | 'admin') => {
        setUser({ role });
        handleNavigate(role === 'admin' ? 'admin' : 'dashboard');
    };
    
    const handleLogout = () => {
        setUser(null);
        handleNavigate('home');
    };

    // --- Modals and Popups ---
    const handleSelectPackage = (pkg: FundingPackage) => {
        if (!user) {
            handleNavigate('login');
        } else {
            setSelectedPackage(pkg);
        }
    };

    const handleCloseModal = () => {
        setSelectedPackage(null);
    };

    // --- Promotional Popup Logic ---
    const checkAndShowPopup = useCallback(() => {
        if(currentPage !== 'home') return;
        const popupDismissed = sessionStorage.getItem('promoPopupDismissed');
        if (popupDismissed !== 'true') {
            setIsPopupVisible(true);
        }
    }, [currentPage]);

    useEffect(() => {
        const timer = setTimeout(() => {
            checkAndShowPopup();
        }, 3500);

        const handleScroll = () => {
            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5;
            if (isAtBottom) {
                checkAndShowPopup();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [checkAndShowPopup]);

    const dismissPopup = () => {
        sessionStorage.setItem('promoPopupDismissed', 'true');
        setIsPopupVisible(false);
    };
    
    const renderPage = () => {
        switch (currentPage) {
            case 'login':
                return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
            case 'signup':
                return <SignupPage onNavigate={handleNavigate} onLogin={handleLogin} />;
            case 'admin-login':
                return <AdminLoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
            case 'dashboard':
                return <ClientDashboard onNavigate={handleNavigate} />;
            case 'admin':
                return <AdminDashboard />;
            case 'home':
            default:
                return <HomePage onSelectPackage={handleSelectPackage} />;
        }
    }

    return (
        <div className="bg-black text-white font-sans">
            <Header user={user} onNavigate={handleNavigate} onLogout={handleLogout} />
            <main>
                {renderPage()}
            </main>
            <Footer />
            
            {currentPage === 'home' && <NotificationToast />}
            
            <CheckoutModal pkg={selectedPackage} onClose={handleCloseModal} />
            <PromotionalPopup isVisible={isPopupVisible} onDismiss={dismissPopup} />
        </div>
    );
};

export default App;