
import React from 'react';
import { PAYMENT_DETAILS, CONTACT_PHONE } from '../constants';

// This is a placeholder for a QR code component.
// In a real project, you would use a library like 'qrcode.react'.
// For this self-contained example, we'll render an SVG placeholder.
const QRCode: React.FC<{ value: string; size?: number }> = ({ value, size = 160 }) => (
    <div style={{ width: size, height: size }} className="p-2 bg-white rounded-lg flex items-center justify-center">
         <svg width={size-16} height={size-16} viewBox="0 0 100 100" className="text-gray-800">
            <text x="50" y="50" dominantBaseline="middle" textAnchor="middle" fontSize="10">QR Code for:</text>
            <text x="50" y="65" dominantBaseline="middle" textAnchor="middle" fontSize="8">{value.substring(0, 12)}...</text>
        </svg>
    </div>
);


const Payment: React.FC = () => {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Address copied to clipboard!');
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };

    return (
        <section id="payment" className="py-20 md:py-32 bg-gray-900/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                        Instant Payment via <span className="text-yellow-400">Binance / USDT TRC20</span>
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                        Make your payment using the details below to get your funded account instantly.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto bg-black p-8 rounded-2xl border border-yellow-400/30 shadow-2xl shadow-yellow-500/10 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                        <QRCode value={PAYMENT_DETAILS.trc20Address} />
                    </div>
                    <div className="flex-grow w-full">
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Binance ID</label>
                            <div className="flex items-center bg-gray-800 p-3 rounded-lg">
                                <span className="text-white font-mono flex-grow">{PAYMENT_DETAILS.binanceId}</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">USDT TRC20 Address</label>
                            <div className="flex items-center bg-gray-800 p-3 rounded-lg">
                                <span className="text-white font-mono flex-grow break-all">{PAYMENT_DETAILS.trc20Address}</span>
                                <button 
                                    onClick={() => copyToClipboard(PAYMENT_DETAILS.trc20Address)}
                                    className="ml-4 flex-shrink-0 bg-yellow-500 text-black px-3 py-1 rounded text-sm font-bold hover:bg-yellow-400 transition-colors"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-yellow-900/30 border border-yellow-400/50 rounded-lg text-center">
                            <p className="text-yellow-200">
                                After payment, send a screenshot to 
                                <a href={`https://wa.me/${CONTACT_PHONE.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="font-bold underline ml-1 hover:text-white">
                                    {CONTACT_PHONE}
                                </a> for verification.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Payment;
