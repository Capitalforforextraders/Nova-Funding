import React, { useState, useEffect } from 'react';
import type { Page } from '../App';

const NovaFundingLogo: React.FC<{ onNavigate: (page: 'home') => void }> = ({ onNavigate }) => (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 7L12 12L22 7" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22V12" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-2xl font-bold text-white tracking-wider">
            NOVA <span className="text-yellow-400">FUNDING</span>
        </span>
    </div>
);


interface HeaderProps {
    user: { role: 'user' | 'admin' } | null;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onNavigate, onLogout }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'Packages', href: '#packages' },
        { name: 'Reviews', href: '#reviews' },
    ];
    
    const scrollToSection = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        onNavigate('home');
        // Need a slight delay for the page to switch back to home before scrolling
        setTimeout(() => {
             document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        setMobileMenuOpen(false);
    };
    
    const handleDashboardClick = () => {
        if(user?.role === 'admin') {
            onNavigate('admin');
        } else {
            onNavigate('dashboard');
        }
        setMobileMenuOpen(false);
    }

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !!user || mobileMenuOpen ? 'bg-black/80 backdrop-blur-lg border-b border-yellow-400/20' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <NovaFundingLogo onNavigate={onNavigate} />
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium">
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center space-x-4">
                        {user ? (
                             <>
                                <button onClick={handleDashboardClick} className="font-semibold text-white hover:text-yellow-400 transition-colors">Dashboard</button>
                                <button onClick={onLogout} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full transition-colors">Logout</button>
                            </>
                        ) : (
                             <>
                                <button onClick={() => onNavigate('login')} className="font-semibold text-white hover:text-yellow-400 transition-colors">Login</button>
                                <button onClick={() => onNavigate('signup')} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full transition-colors">Sign Up</button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-black/90 backdrop-blur-lg">
                    <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3 flex flex-col items-center">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-yellow-400 hover:bg-gray-800 w-full text-center">
                                {link.name}
                            </a>
                        ))}
                        <div className="pt-4 mt-4 border-t border-gray-700 w-full flex flex-col items-center space-y-4">
                           {user ? (
                                <>
                                    <button onClick={handleDashboardClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-yellow-400 hover:bg-gray-800 w-full text-center">Dashboard</button>
                                    <button onClick={() => {onLogout(); setMobileMenuOpen(false);}} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full transition-colors w-48 text-center">Logout</button>
                                </>
                           ) : (
                               <>
                                    <button onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-yellow-400 hover:bg-gray-800 w-full text-center">Login</button>
                                    <button onClick={() => { onNavigate('signup'); setMobileMenuOpen(false); }} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full transition-colors w-48 text-center">Sign Up</button>
                               </>
                           )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;