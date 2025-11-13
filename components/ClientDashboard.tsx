import React from 'react';

const StatCard: React.FC<{ title: string; value: string; }> = ({ title, value }) => (
    <div className="bg-gray-900/50 border border-yellow-400/20 rounded-xl p-6">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
    </div>
);


const ClientDashboard: React.FC<{ onNavigate: (page: 'home') => void }> = ({ onNavigate }) => {
    
    const handleViewPackages = () => {
        onNavigate('home');
         setTimeout(() => {
             document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    return (
        <div className="min-h-screen bg-black pt-24 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Client Dashboard</h1>
                    <p className="mt-1 text-lg text-gray-400">Welcome back, Trader!</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Account Size" value="$0" />
                    <StatCard title="Current Balance" value="$0.00" />
                    <StatCard title="Withdrawable Profit" value="$0.00" />
                </div>
                
                <div className="bg-gray-900/50 border border-yellow-400/20 rounded-xl p-8 text-center">
                    <h2 className="text-xl font-semibold text-white">Ready to Get Funded?</h2>
                    <p className="mt-2 text-gray-400">You do not have an active account. Purchase a package to start trading.</p>
                     <button
                        onClick={handleViewPackages}
                        className="mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-2 px-6 rounded-lg text-md transition-transform duration-300 ease-in-out transform hover:scale-105"
                    >
                        View Funding Packages
                    </button>
                </div>
                
                {/* Placeholder for future content */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Trading History</h3>
                    <div className="bg-gray-900/50 border border-yellow-400/20 rounded-xl p-8 text-center text-gray-500">
                        No trading activity yet.
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ClientDashboard;
