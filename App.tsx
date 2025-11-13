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
import type { FundingPackage } from './types';

const App: React.FC = () => {
    const [selectedPackage, setSelectedPackage] = useState<FundingPackage | null>(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleSelectPackage = (pkg: FundingPackage) => {
        setSelectedPackage(pkg);
    };

    const handleCloseModal = () => {
        setSelectedPackage(null);
    };
    
    const handleScrollToPackages = () => {
        document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' });
    };

    // --- Promotional Popup Logic ---
    const checkAndShowPopup = useCallback(() => {
        const popupDismissed = sessionStorage.getItem('promoPopupDismissed');
        if (popupDismissed !== 'true') {
            setIsPopupVisible(true);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            checkAndShowPopup();
        }, 3500); // Show after 3.5 seconds

        const handleScroll = () => {
            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5; // -5 for tolerance
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
    // --- End Promotional Popup Logic ---

    return (
        <div className="bg-black text-white font-sans">
            <Header />
            <main>
                <Hero onGetFunded={handleScrollToPackages} />
                <Features />
                <Packages onSelectPackage={handleSelectPackage} />
                <Rules />
                <Reviews />
            </main>
            <Footer />
            
            <CheckoutModal pkg={selectedPackage} onClose={handleCloseModal} />
            <NotificationToast />
            <PromotionalPopup isVisible={isPopupVisible} onDismiss={dismissPopup} />
        </div>
    );
};

export default App;