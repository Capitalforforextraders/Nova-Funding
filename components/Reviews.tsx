
import React, { useState } from 'react';
import { REVIEWS } from '../constants';
import type { Review } from '../types';

const ReviewModal: React.FC<{ review: Review | null; onClose: () => void }> = ({ review, onClose }) => {
    if (!review) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity" onClick={onClose}>
            <div className="bg-gray-900 rounded-lg overflow-hidden max-w-lg w-full m-4 relative border border-yellow-500/30" onClick={(e) => e.stopPropagation()}>
                <div className="p-4">
                    <h3 className="text-lg font-bold text-white text-center">{review.name}'s Payout Screenshot</h3>
                </div>
                <img src={review.paymentImage} alt={`${review.name}'s payment screenshot`} className="w-full h-auto object-contain max-h-[80vh]" />
                 <button onClick={onClose} className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-1 hover:bg-black">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

const Reviews: React.FC = () => {
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    const openModal = (review: Review) => {
        setSelectedReview(review);
    };

    const closeModal = () => {
        setSelectedReview(null);
    };

    return (
        <section id="reviews" className="py-20 md:py-32 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                        Trusted by <span className="text-yellow-400">Traders Like You</span>
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                        Real results from our funded traders.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {REVIEWS.map((review) => (
                        <div key={review.id} className="bg-gray-900/50 border border-yellow-400/20 rounded-2xl p-6 flex flex-col space-y-4 transition-all duration-300 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/10">
                            <div className="flex items-center space-x-4">
                                <img src={review.userImage} alt={review.name} className="w-16 h-16 rounded-full border-2 border-yellow-400 object-cover" />
                                <div>
                                    <h4 className="text-lg font-bold text-white">{review.name}</h4>
                                    <p className="text-sm text-gray-400">Bought ${review.accountBought.toLocaleString()} account</p>
                                </div>
                            </div>
                            <p className="text-lg text-gray-200 flex-grow">
                                "{review.quote} <strong>${review.profit.toLocaleString()}</strong>"
                            </p>
                            <button
                                onClick={() => openModal(review)}
                                className="mt-auto w-full text-sm flex items-center justify-center space-x-2 text-yellow-400 border border-yellow-400/50 rounded-lg py-2 px-4 hover:bg-yellow-400 hover:text-black transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                                <span>View Payout Screenshot</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <ReviewModal review={selectedReview} onClose={closeModal} />
        </section>
    );
};

export default Reviews;
