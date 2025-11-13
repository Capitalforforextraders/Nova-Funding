
import React from 'react';

const RuleItem: React.FC<{ title: string; value: string }> = ({ title, value }) => (
    <div className="p-6 bg-gray-900/50 border border-yellow-400/20 rounded-xl text-center backdrop-blur-sm">
        <p className="text-sm text-gray-400 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-white mt-2">{value}</p>
    </div>
);

const Rules: React.FC = () => {
    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                        Simple & Clear <span className="text-yellow-400">Trading Rules</span>
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                        Our rules are designed to help you succeed. No phases—instant live funded accounts.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <RuleItem title="Daily Drawdown" value="10% Limit" />
                    <RuleItem title="Overall Drawdown" value="40% Limit" />
                    <RuleItem title="Profit Sharing" value="Up to 80%" />
                    <RuleItem title="Payouts" value="Daily Available" />
                </div>
            </div>
        </section>
    );
};

export default Rules;
