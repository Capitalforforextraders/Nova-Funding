import React, { useState } from 'react';
import type { Page } from '../App';

interface SignupPageProps {
    onNavigate: (page: Page) => void;
    onLogin: (role: 'user') => void; // Signup logs in as user
}

const SignupPage: React.FC<SignupPageProps> = ({ onNavigate, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password && name) {
            // In a real app, you'd register the user
            onLogin('user');
        } else {
            alert('Please fill all fields.');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center pt-20 px-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-900/50 border border-yellow-400/20 rounded-2xl shadow-2xl shadow-yellow-500/10">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Create a new account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                    <div className="rounded-md shadow-sm">
                        <div>
                             <label htmlFor="full-name" className="sr-only">Full Name</label>
                             <input 
                                id="full-name" 
                                name="name" 
                                type="text" 
                                required 
                                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm" 
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input 
                                id="email-address" 
                                name="email" 
                                type="email" 
                                autoComplete="email" 
                                required 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm" 
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
                                autoComplete="new-password" 
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
                            Sign up
                        </button>
                    </div>
                </form>
                 <p className="mt-2 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <button onClick={() => onNavigate('login')} className="font-medium text-yellow-400 hover:text-yellow-300">
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;