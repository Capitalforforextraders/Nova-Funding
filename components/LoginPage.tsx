import React, { useState } from 'react';
import type { Page } from '../App';

interface LoginPageProps {
    onNavigate: (page: Page) => void;
    onLogin: (role: 'user') => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd validate credentials
        if (email && password) {
            onLogin('user');
        } else {
            alert('Please enter email and password.');
        }
    };
    
    return (
        <div className="min-h-screen bg-black flex items-center justify-center pt-20 px-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-900/50 border border-yellow-400/20 rounded-2xl shadow-2xl shadow-yellow-500/10">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Login to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input 
                                id="email-address" 
                                name="email" 
                                type="email" 
                                autoComplete="email" 
                                required 
                                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm" 
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                           <label htmlFor="password" className="sr-only">Password</label>
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                autoComplete="current-password" 
                                required 
                                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button 
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                 <p className="mt-2 text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <button onClick={() => onNavigate('signup')} className="font-medium text-yellow-400 hover:text-yellow-300">
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;