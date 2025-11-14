
import React from 'react';
import type { User, AccountStatus } from '../types';

interface ClientDashboardProps {
    user: User;
    onNavigate: (page: 'home') => void;
}

const StatCard: React.FC<{ title: string; value: string | React.ReactNode; }> = ({ title, value }) => (
    <div className="bg-gray-900/50 border border-yellow-400/20 rounded-xl p-6 transform transition-transform duration-300 hover:scale-105 hover:border-yellow-400">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <div className="mt-1 text-3xl font-semibold text-white">{value}</div>
    </div>
);

const getStatusPill = (status: AccountStatus) => {
    const baseClasses = "px-3 py-1 text-sm font-bold rounded-full";
    switch(status) {
        case 'active':
            return <span className={`${baseClasses} bg-green-500/20 text-green-300`}>Active</span>;
        case 'pending':
        case 'review':
            return <span className={`${baseClasses} bg-yellow-500/20 text-yellow-300`}>Pending</span>;
        case 'suspended':
        case 'banned':
            return <span className={`${baseClasses} bg-red-500/20 text-red-300`}>Suspended</span>;
        default:
            return <span className={`${baseClasses} bg-gray-500/20 text-gray-300`}>Unknown</span>;
    }
};

const ClientDashboard: React.FC<ClientDashboardProps> = ({ user, onNavigate }) => {
    
    const handleViewPackages = () => {
        onNavigate('home');
        setTimeout(() => {
            document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    return (
        <div className="min-h-screen bg-black pt-28 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Welcome back, {user.name.split(' ')[0]}!</h1>
                    <p className="mt-1 text-lg text-gray-400">Here's an overview of your trading account.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <StatCard title="Account Status" value={getStatusPill(user.status)} />
                    <StatCard title="Account Size" value={`$${user.accountSize.toLocaleString()}`} />
                    <StatCard title="Withdrawable Profit" value="$0.00" />
                </div>
                
                <section id="my-account">
                    <h2 className="text-2xl font-semibold text-white mb-4">My Funded Account</h2>
                     {user.accountSize === 0 ? (
                        <div className="bg-gray-900/50 border border-yellow-400/20 rounded-xl p-8 text-center">
                            <h3 className="text-xl font-semibold text-white">Ready to Get Funded?</h3>
                            <p className="mt-2 text-gray-400">You do not have an active account. Purchase a package to start trading.</p>
                            <button
                                onClick={handleViewPackages}
                                className="mt-6 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-2 px-6 rounded-lg text-md transition-transform duration-300 ease-in-out transform hover:scale-105"
                            >
                                View Funding Packages
                            </button>
                        </div>
                    ) : (
                        <div className="bg-gray-900/50 border border-yellow-400/20 rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-xl font-semibold text-white">Your ${user.accountSize.toLocaleString()} Account</h3>
                                <p className="mt-2 text-gray-400">Account details and trading credentials will be displayed here once active.</p>
                                <div className="mt-4 space-y-2">
                                    <p className="text-gray-300"><span className="font-semibold text-white">Login:</span> TBD</p>
                                    <p className="text-gray-300"><span className="font-semibold text-white">Password:</span> TBD</p>
                                    <p className="text-gray-300"><span className="font-semibold text-white">Server:</span> NovaFunding-Live</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-400 mb-2">Want more capital?</p>
                                <button
                                    onClick={handleViewPackages}
                                    className="bg-gray-800 border border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/10 font-bold py-2 px-6 rounded-lg text-md transition-all duration-300"
                                >
                                    Upgrade Account Size
                                </button>
                            </div>
                        </div>
                    )}
                </section>
                
                <section id="payout-history" className="mt-10">
                    <h2 className="text-2xl font-semibold text-white mb-4">Payout History</h2>
                    <div className="bg-gray-900/50 border border-yellow-400/20 rounded-xl p-8 text-center text-gray-500">
                        {user.payoutHistory.length > 0 ? (
                            <p>Payout history will be displayed here.</p> // Placeholder
                        ) : (
                            <p>No payout history yet.</p>
                        )}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default ClientDashboard;
