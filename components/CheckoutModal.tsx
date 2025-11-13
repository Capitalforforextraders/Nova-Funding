
import React, { useState } from 'react';
import type { FundingPackage } from '../types';
import { PAYMENT_DETAILS, CONTACT_PHONE } from '../constants';

// Placeholder QR Code component
const QRCode: React.FC<{ value: string; size?: number }> = ({ value, size = 160 }) => (
    <div style={{ width: size, height: size }} className="p-2 bg-white rounded-lg flex items-center justify-center mx-auto">
        <svg width={size-16} height={size-16} viewBox="0 0 100 100" className="text-gray-800">
            <text x="50" y="50" dominantBaseline="middle" textAnchor="middle" fontSize="10">QR Code for:</text>
            <text x="50" y="65" dominantBaseline="middle" textAnchor="middle" fontSize="8">{value.substring(0, 12)}...</text>
        </svg>
    </div>
);

interface CheckoutModalProps {
    pkg: FundingPackage | null;
    onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ pkg, onClose }) => {
    const [screenshot, setScreenshot] = useState<File | null>(null);
    const [senderName, setSenderName] = useState('');
    const [txId, setTxId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!pkg) return null;
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setScreenshot(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!screenshot) {
            alert('Please upload a payment screenshot.');
            return;
        }
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            alert(`Verification submitted for ${pkg.accountSize} account! We will contact you shortly.`);
            onClose();
        }, 2000);
    };
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Address copied to clipboard!');
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div 
                className="bg-gray-900 border border-yellow-500/30 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative text-white shadow-2xl shadow-yellow-500/20"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Complete Your Purchase</h2>
                    <p className="text-center text-yellow-400 text-xl font-semibold mb-6">${pkg.accountSize.toLocaleString()} Account for ${pkg.price.toLocaleString()}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left side: Payment Info */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white">1. Make Payment</h3>
                            <div className="p-4 bg-gray-800 rounded-lg">
                                <QRCode value={PAYMENT_DETAILS.trc20Address} />
                            </div>
                            <div>
                               <label className="text-sm text-gray-400">USDT TRC20 Address</label>
                               <div className="flex items-center bg-gray-700 p-3 rounded-lg mt-1">
                                  <span className="font-mono text-sm break-all flex-grow">{PAYMENT_DETAILS.trc20Address}</span>
                                  <button onClick={() => copyToClipboard(PAYMENT_DETAILS.trc20Address)} className="ml-2 flex-shrink-0 bg-yellow-500 text-black px-3 py-1 text-xs font-bold rounded hover:bg-yellow-400">Copy</button>
                               </div>
                            </div>
                            <div className="p-3 bg-blue-900/30 border border-blue-400/50 rounded-lg text-sm text-blue-200">
                                Send exactly <strong>{pkg.price} USDT</strong> (TRC20) to the address above.
                            </div>
                        </div>

                        {/* Right side: Verification Form */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white">2. Submit for Verification</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="senderName" className="block text-sm font-medium text-gray-300">Sender Name / Binance Nickname</label>
                                    <input type="text" id="senderName" value={senderName} onChange={e => setSenderName(e.target.value)} className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                                </div>
                                <div>
                                    <label htmlFor="txId" className="block text-sm font-medium text-gray-300">Transaction ID (Optional)</label>
                                    <input type="text" id="txId" value={txId} onChange={e => setTxId(e.target.value)} className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                                </div>
                                <div>
                                    <label htmlFor="screenshot" className="block text-sm font-medium text-gray-300">Upload Payment Screenshot</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            <div className="flex text-sm text-gray-500">
                                                <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-yellow-400 hover:text-yellow-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:ring-yellow-500 p-1">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">{screenshot ? screenshot.name : 'PNG, JPG, GIF up to 10MB'}</p>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
                                </button>
                                <p className="text-xs text-center text-gray-400">After submitting, contact us on WhatsApp at {CONTACT_PHONE} for faster processing.</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
