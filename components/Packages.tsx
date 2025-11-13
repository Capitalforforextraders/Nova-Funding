
import React from 'react';
import { FUNDING_PACKAGES } from '../constants';
import type { FundingPackage } from '../types';
import CheckIcon from './icons/CheckIcon';

interface PackagesProps {
    onSelectPackage: (pkg: FundingPackage) => void;
}

const Packages: React.FC<PackagesProps> = ({ onSelectPackage }) => {
    return (
        <section id="packages" className="py-20 md:py-32 bg-black overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                        Choose Your <span className="text-yellow-400">Funding Package</span>
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                        Select an account size that fits your trading style. All packages come with a one-time 10% fee.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FUNDING_PACKAGES.map((pkg, index) => (
                        <div 
                            key={pkg.id} 
                            className="relative bg-gray-900/50 border border-yellow-400/20 rounded-2xl p-8 flex flex-col transition-all duration-300 transform hover:scale-105 hover:border-yellow-400 hover:shadow-2xl hover:shadow-yellow-500/20"
                        >
                            <div className="flex-grow">
                                <h3 className="text-2xl font-bold text-white">
                                    ${pkg.accountSize.toLocaleString()} Account
                                </h3>
                                <p className="mt-4 text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
                                    ${pkg.price.toLocaleString()}
                                    <span className="text-xl font-medium text-gray-400"> Only</span>
                                </p>
                                <ul className="mt-6 space-y-3 text-gray-300">
                                    {pkg.features.map((feature) => (
                                        <li key={feature} className="flex items-center space-x-3">
                                            <CheckIcon className="h-5 w-5 text-green-500" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-8">
                                <button
                                    onClick={() => onSelectPackage(pkg)}
                                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 px-6 rounded-lg text-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Get Funded
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Packages;
