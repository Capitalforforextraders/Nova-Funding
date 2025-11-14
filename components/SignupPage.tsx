
import React, { useState } from 'react';
import type { Page } from '../App';
import type { User } from '../types';
import { createUser } from '../db';

interface SignupPageProps {
    onNavigate: (page: Page) => void;
    onLogin: (user: User) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onNavigate, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password || !name || !country) {
            setError('Please fill all fields.');
            return;
        }
        setError('');
        setIsLoading(true);

        try {
            const newUser = await createUser({
                name,
                email,
                passwordHash: password, // In production, hash this password before sending.
                country,
                accountSize: 0,
                status: 'pending',
            });
            if (newUser) {
                onLogin(newUser);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to create account.');
        } finally {
            setIsLoading(false);
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
                    {error && (
                        <div className="p-3 bg-red-900/50 border border-red-500/50 text-red-300 text-sm rounded-md text-center">
                            {error}
                        </div>
                    )}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                             <label htmlFor="full-name" className="sr-only">Full Name</label>
                             <input 
                                id="full-name" name="name" type="text" required 
                                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm" 
                                placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address" name="email" type="email" autoComplete="email" required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm" 
                                placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                         <div>
                             <label htmlFor="country" className="sr-only">Country</label>
                             <input 
                                id="country" name="country" type="text" required 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm" 
                                placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                        <div>
                           <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password" name="password" type="password" autoComplete="new-password" required
                                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm" 
                                placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-500 disabled:opacity-50"
                        >
                            {isLoading ? 'Creating account...' : 'Sign up'}
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
