
import React from 'react';
import { WHATSAPP_CHANNEL_LINK } from '../constants';
import WhatsAppIcon from './icons/WhatsAppIcon';

interface PromotionalPopupProps {
    isVisible: boolean;
    onDismiss: () => void;
}

const PromotionalPopup: React.FC<PromotionalPopupProps> = ({ isVisible, onDismiss }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 right-0 left-0 sm:left-auto sm:bottom-5 sm:right-5 z-50 p-4 transition-transform duration-500 transform animate-slide-up">
            <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-2xl p-6 max-w-md w-full text-black">
                <button
                    onClick={onDismiss}
                    className="absolute top-2 right-2 text-black/70 hover:text-black"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="flex items-center space-x-4">
                    <WhatsAppIcon className="h-10 w-10 text-black/80" />
                    <div>
                        <h3 className="font-bold text-lg">Join our WhatsApp community!</h3>
                        <p className="text-sm">Get an exclusive 5% OFF on your first funding package.</p>
                    </div>
                </div>
                <a
                    href={WHATSAPP_CHANNEL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onDismiss}
                    className="mt-4 block w-full text-center bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Join and Get 5% OFF
                </a>
            </div>
            <style>{`
                @keyframes slide-up {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-up {
                    animation: slide-up 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default PromotionalPopup;
