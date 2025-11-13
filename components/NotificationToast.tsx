
import React, { useState, useEffect } from 'react';
import { NOTIFICATIONS } from '../constants';

const NotificationToast: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentNotification, setCurrentNotification] = useState(NOTIFICATIONS[0]);
    const [notificationIndex, setNotificationIndex] = useState(0);

    useEffect(() => {
        const showInterval = setInterval(() => {
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false);
                setTimeout(() => {
                    setNotificationIndex(prevIndex => (prevIndex + 1) % NOTIFICATIONS.length);
                }, 1000); // Wait for fade-out before changing content
            }, 8000); // Visible for 8 seconds
        }, 15000); // Show every 15 seconds

        return () => clearInterval(showInterval);
    }, []);

    useEffect(() => {
        setCurrentNotification(NOTIFICATIONS[notificationIndex]);
    }, [notificationIndex]);

    return (
        <div
            className={`fixed bottom-5 left-5 z-50 transition-all duration-500 transform ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}
        >
            <div className="flex items-center bg-gray-900/80 backdrop-blur-md border border-yellow-500/30 rounded-lg shadow-lg p-4 max-w-sm">
                <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                </div>
                <div>
                    <p className="font-bold text-white">Live Activity</p>
                    <p className="text-sm text-gray-300">{currentNotification.message}</p>
                </div>
                 <button onClick={() => setIsVisible(false)} className="ml-4 text-gray-500 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NotificationToast;
