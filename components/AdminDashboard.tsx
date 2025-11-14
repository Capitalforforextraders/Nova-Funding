
import React, { useState, useMemo } from 'react';
import type { User, AccountStatus } from '../types';
import { FUNDING_PACKAGES } from '../constants';

const statusOptions: AccountStatus[] = ['active', 'pending', 'review', 'suspended', 'banned'];
const accountSizeOptions = [0, ...FUNDING_PACKAGES.map(p => p.accountSize)];

const getStatusPillClasses = (status: AccountStatus) => {
    switch(status) {
        case 'active': return "bg-green-500/20 text-green-300";
        case 'pending':
        case 'review': return "bg-yellow-500/20 text-yellow-300";
        case 'suspended':
        case 'banned': return "bg-red-500/20 text-red-300";
        default: return "bg-gray-500/20 text-gray-300";
    }
};

const AdminStatCard: React.FC<{ title: string; value: string | number; }> = ({ title, value }) => (
    <div className="bg-gray-900/50 border border-yellow-400/20 rounded-xl p-6">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
    </div>
);

const EditUserModal: React.FC<{ user: User; onClose: () => void; onSave: (userId: string, updates: Partial<User>) => void; }> = ({ user, onClose, onSave }) => {
    const [status, setStatus] = useState(user.status);
    const [accountSize, setAccountSize] = useState(user.accountSize);

    const handleSave = () => {
        onSave(user.id, { status, accountSize });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg w-full max-w-md border border-yellow-500/30">
                <div className="p-6">
                    <h3 className="text-lg font-bold text-white">Edit User: {user.name}</h3>
                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Account Size</label>
                            <select value={accountSize} onChange={e => setAccountSize(Number(e.target.value))} className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500">
                                {accountSizeOptions.map(size => <option key={size} value={size}>${size.toLocaleString()}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Status</label>
                            <select value={status} onChange={e => setStatus(e.target.value as AccountStatus)} className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500">
                                {statusOptions.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800/50 px-6 py-3 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-black bg-yellow-400 rounded-md hover:bg-yellow-500">Save Changes</button>
                </div>
            </div>
        </div>
    );
};


const AdminDashboard: React.FC<{ users: User[]; onUpdateUser: (userId: string, updates: Partial<User>) => void; onDeleteUser: (userId: string) => void; }> = ({ users, onUpdateUser, onDeleteUser }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSize, setFilterSize] = useState<string>('all');
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const clientUsers = useMemo(() => users.filter(u => u.role === 'user'), [users]);

    const filteredUsers = useMemo(() => {
        return clientUsers.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterSize === 'all' || user.accountSize === Number(filterSize);
            return matchesSearch && matchesFilter;
        });
    }, [clientUsers, searchTerm, filterSize]);
    
    const stats = useMemo(() => ({
        totalUsers: clientUsers.length,
        activeAccounts: clientUsers.filter(u => u.status === 'active' && u.accountSize > 0).length,
        pendingUsers: clientUsers.filter(u => u.status === 'pending').length,
    }), [clientUsers]);
    
    return (
         <div className="min-h-screen bg-black pt-28 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Admin Dashboard</h1>
                </header>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <AdminStatCard title="Total Users" value={stats.totalUsers} />
                    <AdminStatCard title="Active Accounts" value={stats.activeAccounts} />
                    <AdminStatCard title="Pending Verifications" value={stats.pendingUsers} />
                </div>

                <div className="bg-gray-900/50 border border-yellow-400/20 rounded-xl">
                    <div className="p-4 flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full md:w-1/2 bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        />
                        <select
                            value={filterSize}
                            onChange={e => setFilterSize(e.target.value)}
                             className="w-full md:w-auto bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        >
                            <option value="all">All Account Sizes</option>
                            {accountSizeOptions.map(size => <option key={size} value={size}>${size.toLocaleString()}</option>)}
                        </select>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-400">
                            <thead className="text-xs text-gray-300 uppercase bg-gray-800/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Signup Date</th>
                                    <th scope="col" className="px-6 py-3">Country</th>
                                    <th scope="col" className="px-6 py-3">Account Size</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/40">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{user.name}</div>
                                            <div>{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4">{new Date(user.signupDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">{user.country}</td>
                                        <td className="px-6 py-4 font-semibold text-white">${user.accountSize.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusPillClasses(user.status)} capitalize`}>{user.status}</span>
                                        </td>
                                        <td className="px-6 py-4 flex items-center space-x-2">
                                            <button onClick={() => setEditingUser(user)} className="text-yellow-400 hover:text-yellow-300">Edit</button>
                                            <button onClick={() => onUpdateUser(user.id, {status: 'suspended'})} className="text-orange-400 hover:text-orange-300">Suspend</button>
                                            <button onClick={() => onDeleteUser(user.id)} className="text-red-500 hover:text-red-400">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredUsers.length === 0 && <p className="text-center py-8 text-gray-500">No users found.</p>}
                    </div>
                </div>
            </div>
            {editingUser && <EditUserModal user={editingUser} onClose={() => setEditingUser(null)} onSave={onUpdateUser} />}
        </div>
    );
};

export default AdminDashboard;
