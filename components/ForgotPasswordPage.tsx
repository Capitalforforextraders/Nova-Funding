
import React, { useState } from 'react';
import type { Page } from '../App';

interface ForgotPasswordPageProps {
    onNavigate: (page: Page) => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd trigger a password reset email here.
        // We will just simulate the success message.
        setSubmitted(true);
    };
    
    return (
        <div className="min-h-screen bg-black flex items-center justify-center pt-20 px-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-900/50 border border-yellow-400/20 rounded-2xl shadow-2xl shadow-yellow-500/10">
                {submitted ? (
                    <div>
                        <h2 className="mt-6 text-center text-2xl font-extrabold text-white">
                            Check your email
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-300">
                            If an account exists for {email}, you will receive an email with instructions on how to reset your password.
                        </p>
                        <div className="mt-6">
                            <button onClick={() => onNavigate('login')} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500">
                                Return to Login
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                                Forgot Password?
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-400">
                                Enter your email and we'll send you a link to reset your password.
                            </p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input 
                                        id="email-address" name="email" type="email" autoComplete="email" required 
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" 
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <button 
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-500"
                                >
                                    Send Reset Link
                                </button>
                            </div>
                        </form>
                        <p className="mt-2 text-center text-sm text-gray-400">
                            Remembered your password?{' '}
                            <button onClick={() => onNavigate('login')} className="font-medium text-yellow-400 hover:text-yellow-300">
                                Log in
                            </button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
