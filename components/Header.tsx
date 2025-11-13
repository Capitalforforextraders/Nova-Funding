import React, { useState, useEffect } from 'react';
import { CONTACT_PHONE, WHATSAPP_CHANNEL_LINK } from '../constants';
import WhatsAppIcon from './icons/WhatsAppIcon';

const NovaFundingLogo: React.FC = () => (
    <div className="flex items-center space-x-2">
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

const Header: React.FC = () => {
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
    
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-yellow-400/20' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <NovaFundingLogo />
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium">
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center space-x-4">
                        <a href={`tel:${CONTACT_PHONE}`} className="text-sm font-semibold text-white hover:text-yellow-400 transition-colors">{CONTACT_PHONE}</a>
                        <a href={WHATSAPP_CHANNEL_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 ease-in-out hover:scale-105">
                            <WhatsAppIcon className="h-5 w-5" />
                            <span>Join Channel</span>
                        </a>
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
                        <div className="pt-4 border-t border-gray-700 w-full flex flex-col items-center space-y-4">
                           <a href={`tel:${CONTACT_PHONE}`} className="text-sm font-semibold text-white hover:text-yellow-400 transition-colors">{CONTACT_PHONE}</a>
                            <a href={WHATSAPP_CHANNEL_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 ease-in-out hover:scale-105 w-48">
                                <WhatsAppIcon className="h-5 w-5" />
                                <span>Join Channel</span>
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;