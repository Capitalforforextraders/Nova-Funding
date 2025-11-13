
import React from 'react';
import { CONTACT_PHONE, WHATSAPP_CHANNEL_LINK } from '../constants';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 border-t border-yellow-500/20">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} Nova Funding. All Rights Reserved.</p>
                <div className="mt-4 flex justify-center items-center space-x-6">
                    <a href={`tel:${CONTACT_PHONE}`} className="hover:text-yellow-400 transition-colors">{CONTACT_PHONE}</a>
                    <a href={WHATSAPP_CHANNEL_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">WhatsApp Channel</a>
                </div>
                 <p className="text-xs mt-4 max-w-3xl mx-auto">
                    Disclaimer: Trading foreign exchange on margin carries a high level of risk, and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to invest in foreign exchange you should carefully consider your investment objectives, level of experience, and risk appetite.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
