import React from 'react';

const AdminStatCard: React.FC<{ title: string; value: string; }> = ({ title, value }) => (
    <div className="bg-gray-900/50 border border-yellow-400/20 rounded-xl p-6">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
    </div>
);

const AdminDashboard: React.FC = () => {
    return (
         <div className="min-h-screen bg-black pt-24 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Admin Dashboard</h1>
                </header>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <AdminStatCard title="Pending Verifications" value="0" />
                    <AdminStatCard title="Total Users" value="0" />
                    <AdminStatCard title="Active Accounts" value="0" />
                    <AdminStatCard title="Payout Requests" value="0" />
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Pending Payment Verifications</h3>
                    <div className="bg-gray-900/50 border border-yellow-400/20 rounded-xl p-8 text-center text-gray-500">
                        No pending verifications.
                    </div>
                </div>
                
                 <div className="mt-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Manage Users</h3>
                    <div className="bg-gray-900/50 border border-yellow-400/20 rounded-xl p-8 text-center text-gray-500">
                        User management interface placeholder.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
